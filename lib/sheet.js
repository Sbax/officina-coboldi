const { GoogleSpreadsheet } = require("google-spreadsheet");

const SHEETS = {
  EVENTS: 0,
  BOOKINGS: 1,
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
    .map(({ id, title, system, dm, date, time, place, max, booked }) => ({
      id,
      title,
      system,
      dm,
      date,
      time,
      place,
      max,
      booked,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

const addBooking = async (body) => {
  try {
    const sheet = await getSheet(SHEETS.BOOKINGS);

    const { title, date, time, name } = body;

    if (!title || date || time || name) {
      throw new Error(`Required values missing`);
    }

    await sheet.addRow({
      title,
      date,
      time,
      name,
    });

    return body;
  } catch (error) {
    return { error: error.toString() };
  }
};

module.exports = {
  getEvents,
  addBooking,
};
