import handleResponse from "../../lib/handleResponse";
import runMiddleware from "../../lib/middleware";
import propelauth from "../../lib/propelauth";
import { addEvent, getEvents, updateEvent } from "../../lib/supabase";

const requireUser = (req, res) =>
  runMiddleware(req, res, propelauth.requireUser);

export default async function handler(req, res) {
  if (req.method === "GET") {
    handleResponse({ res }, await getEvents());
    return res;
  }

  // Verifies that a valid accessToken is provided
  await requireUser(req, res);

  if (req.method === "PUT") {
    const { error, ...data } = await addEvent(req.body);

    if (error) res.status(500).send(error);

    res.send(data);
    return res;
  }

  if (req.method === "POST") {
    const { error, ...data } = await updateEvent(req.body);

    if (error) res.status(500).send(error);

    res.send(data);
    return res;
  }
}
