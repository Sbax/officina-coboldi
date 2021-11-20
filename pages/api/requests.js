import { addRequest } from "../../lib/sheet";
import handleResponse from "../../lib/handleResponse";
import { sendNotification } from "../../lib/telegram";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    await handleResponse({ res }, await addRequest(req.body), async () => {
      const { event, name, people, instagram, phone } = req.body;

      console.log("Handling response", {
        event,
        name,
        people,
        instagram,
        phone,
      });

      const message = [
        `Nuova prenotazione per ${event.title} in data ${event.date} con ${event.dm}`,
        `${name}, ${people} persone (instagram: ${instagram}, phone: ${phone})`,
        "",
        `<a href="https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SPREADSHEET_ID_FROM_URL}">Google Sheet</a>`,
      ].join("\n");

      await sendNotification(message);
    });

    return res;
  }

  res.status(400).send({ message: "Method not allowed" });
}
