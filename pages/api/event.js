import { invalidateEvents } from "../../lib/invalidate-cache";
import runMiddleware from "../../lib/middleware";
import propelauth from "../../lib/propelauth";
import { addEvent, updateEvent } from "../../lib/sheet";

const requireUser = (req, res) =>
  runMiddleware(req, res, propelauth.requireUser);

export default async function handler(req, res) {
  if (req.method !== "PUT" && req.method !== "POST") {
    res.status(400).send({ message: "Method not allowed" });
  }

  // Verifies that a valid accessToken is provided
  await requireUser(req, res);

  if (req.method === "PUT") {
    const { error } = await addEvent(req.body);

    if (error) res.status(500).send(error);
  }

  if (req.method === "POST") {
    const { error } = await updateEvent(req.body);

    if (error) res.status(500).send(error);
  }

  try {
    await invalidateEvents(res);
    res.send({
      message: `Event ${req.method === "POST" ? "updated" : "added"}`,
    });

    return res;
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
