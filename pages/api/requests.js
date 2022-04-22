import handleResponse from "../../lib/handleResponse";
import runMiddleware from "../../lib/middleware";
import propelauth from "../../lib/propelauth";
import {
  addRequest,
  getRequests,
  acceptRequests,
  deleteRequests,
} from "../../lib/supabase";
import { sendNotification } from "../../lib/telegram";

const requireUser = (req, res) =>
  runMiddleware(req, res, propelauth.requireUser);

export default async function handler(req, res) {
  if (req.method === "PUT") {
    handleResponse({ res }, await addRequest(req.body), async (payload) => {
      const { event, name, people, instagram, phone } = req.body;

      const message = [
        `Nuova prenotazione per ${event.title} (${event.system}) in data ${event.date} con ${event.dm.name}`,
        `${name}, ${people} persone (instagram: ${instagram}, phone: ${phone})`,
        "",
        `<pre>${JSON.stringify(payload.map(({ id }) => id))}</pre>`,
      ].join("\n");

      await sendNotification(message, payload);
    });

    return res;
  }

  if (req.method === "GET") {
    await requireUser(req, res);

    handleResponse({ res }, await getRequests(req.body));
    return res;
  }

  if (req.method === "POST") {
    // accept booking
    await requireUser(req, res);

    handleResponse({ res }, await acceptRequests(req.body));
    return res;
  }

  if (req.method === "DELETE") {
    // delete booking
    await requireUser(req, res);

    handleResponse({ res }, await deleteRequests(req.body));
    return res;
  }

  res.status(400).send({ message: "Method not allowed" });
}
