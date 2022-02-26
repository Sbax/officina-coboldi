const { GoogleSpreadsheet } = require("google-spreadsheet");

const SHEETS = {
  EVENTS: 0,
  BOOKINGS: 1,
  REQUESTS: 2,
};

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_FROM_URL);

const getSheet = async (index) => {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });
  await doc.loadInfo(); // loads document properties and worksheets. required.
  const sheet = doc.sheetsByIndex[index];

  return sheet;
};

const readSheet = async (index) => {
  try {
    const sheet = await getSheet(index);
    const rows = await sheet.getRows();

    return rows.map((row) => serializeRow(sheet, row));
  } catch (error) {
    return { error: error.toString() };
  }
};

const serializeRow = (sheet, row) => {
  return sheet.headerValues.reduce((aggregated, header) => {
    aggregated[header] = row[header];
    return aggregated;
  }, {});
};

const getEvents = async () => {
  const events = await readSheet(SHEETS.EVENTS);

  if (events.error) {
    return { error: events.error };
  }

  return events
    .map(
      ({
        id,
        title,
        system,
        dm,
        dmlink,
        date,
        time,
        place,
        placelink,
        max,
        booked,
        reservationLink = null,
      }) => ({
        id,
        title,
        system,
        dm: {
          name: dm,
          link: dmlink,
        },
        date,
        time,
        place: {
          name: place,
          link: placelink,
        },
        max,
        booked,
        reservationLink,
      })
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

const addRequest = async (body) => {
  try {
    const sheet = await getSheet(SHEETS.REQUESTS);

    const { id, name, instagram, phone, people } = body;

    if (!id || !name || (!instagram && !phone)) {
      throw new Error(`Required values missing`);
    }

    const [first, ...other] = Array.from({ length: people || 1 }).map(() => ({
      id,
      name,
      instagram,
      phone,
    }));

    await sheet.addRows([
      first,
      ...other.map(({ name, id }, index) => ({
        id,
        name: `${name} +${index + 1}`,
        instagram: "",
        phone: "",
      })),
    ]);

    return body;
  } catch (error) {
    return { error: error.toString() };
  }
};

module.exports = {
  getEvents,
  addRequest,
};
