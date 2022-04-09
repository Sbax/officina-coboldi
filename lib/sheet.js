const { GoogleSpreadsheet } = require("google-spreadsheet");
import { v4 as uuidv4 } from "uuid";

const SHEETS = {
  EVENTS: 0,
  REQUESTS: 1,
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

    return rows.map((row) => ({
      rowNumber: row.rowNumber,
      ...serializeRow(sheet, row),
    }));
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
        max: parseInt(max),
        booked: parseInt(booked),
        reservationLink,
      })
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

const getRequests = async () => {
  const requests = await readSheet(SHEETS.REQUESTS);

  if (requests.error) {
    return { error: requests.error };
  }

  return requests
    .map(({ id, eventId, name, instagram, phone, accepted, rowNumber }) => ({
      id,
      eventId,
      name,
      instagram,
      phone,
      accepted: accepted === "TRUE",
      pending: !accepted,
      rowNumber,
    }))
    .filter(({ eventId }) => eventId);
};

const addEvent = async (body) => {
  try {
    const sheet = await getSheet(SHEETS.EVENTS);

    await sheet.addRows([
      {
        id: uuidv4(),
        ...body,
      },
    ]);

    return body;
  } catch (error) {
    return { error: error.toString() };
  }
};

const updateEvent = async (body) => {
  try {
    const sheet = await getSheet(SHEETS.EVENTS);

    const [row] = await sheet.getRows({ limit: 1, offset: body.rowNumber - 2 });

    const {
      title,
      system,
      dm,
      dmlink,
      date,
      time,
      place,
      placelink,
      max,
      reservationLink,
    } = body;

    row.title = title;
    row.system = system;
    row.dm = dm;
    row.dmlink = dmlink;
    row.date = date;
    row.time = time;
    row.place = place;
    row.placelink = placelink;
    row.max = max;
    row.reservationLink = reservationLink;

    row.save();

    return body;
  } catch (error) {
    return { error: error.toString() };
  }
};

const addRequest = async (body) => {
  try {
    const sheet = await getSheet(SHEETS.REQUESTS);

    const { event, name, instagram, phone, people } = body;
    const eventId = event.id;

    if (!eventId || !name || (!instagram && !phone)) {
      throw new Error(
        `Required values missing`,
        eventId,
        name,
        instagram,
        phone
      );
    }

    const [first, ...other] = Array.from({ length: people || 1 }).map(() => ({
      id: uuidv4(),
      eventId,
      name,
      instagram,
      phone,
    }));

    await sheet.addRows([
      first,
      ...other.map(({ name, eventId }, index) => ({
        id: uuidv4(),
        eventId,
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

const handleRequests = async (list, accept = true) => {
  try {
    const requests = await getSheet(SHEETS.REQUESTS);
    await requests.loadCells("");
    list.map(({ rowNumber }) => {
      requests.getCellByA1(`F${rowNumber}`).value = accept;
    });
    await requests.saveUpdatedCells();
    return list;
  } catch (error) {
    return { error: error.toString() };
  }
};

const acceptRequests = (list) => handleRequests(list, true);
const deleteRequests = (list) => handleRequests(list, false);

module.exports = {
  getEvents,
  getRequests,
  addEvent,
  addRequest,
  updateEvent,
  acceptRequests,
  deleteRequests,
};
