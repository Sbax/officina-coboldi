import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const getEvents = async () => {
  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("*");

  const { data: requests, error: requestsError } = await supabase
    .from("bookings")
    .select("accepted,eventId");

  if (eventsError || requestsError) {
    console.error(eventsError || requestsError);
    return { error: eventsError || requestsError };
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
        booked: requests.filter(
          ({ eventId, accepted }) => accepted && eventId === id
        ).length,
        reservationLink,
      })
    )
    .sort(
      (a, b) =>
        new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
    );
};

const getRequests = async () => {
  const { data: requests, error } = await supabase.from("bookings").select("*");

  if (error) {
    return { error: error };
  }

  return requests
    .map(({ id, eventId, name, instagram, phone, accepted }) => ({
      id,
      eventId,
      name,
      instagram,
      phone,
      accepted: accepted,
      pending: accepted !== true && accepted !== false,
    }))
    .filter(({ eventId }) => eventId);
};

const addEvent = async (body) => {
  const payload = {
    id: uuidv4(),
    ...body,
  };

  const { data, error } = await supabase.from("events").insert([payload]);

  if (error) {
    console.error(error);
    return { error };
  }

  return body;
};

const updateEvent = async ({ id, ...body }) => {
  const { error } = await supabase.from("events").update(body).eq("id", id);

  if (error) {
    console.error(error);
    return { error };
  }

  return { id, ...body };
};

const addRequest = async (body) => {
  const { event, name, instagram, phone, people } = body;
  const eventId = event.id;

  try {
    if (!eventId || !name || (!instagram && !phone)) {
      throw new Error(
        `Required values missing`,
        eventId,
        name,
        instagram,
        phone
      );
    }

    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select("*")
      .eq("id", event.id);

    const [current] = events;

    const { data: requests, error: requestsError } = await supabase
      .from("bookings")
      .select("accepted,eventId")
      .eq("eventId", current.id)
      .eq("accepted", true);

    if (eventsError || requestsError) {
      throw new Error(`Can't book this event: event not found`);
    }

    if (new Date(current.date) < new Date()) {
      throw new Error(`Can't book this event: event in the past`);
    }

    if (current.reservationLink) {
      throw new Error(`Can't book this event: reservation link`);
    }

    if (
      requests.length >= parseInt(current.max) ||
      requests.length + (people || 1) > parseInt(current.max)
    ) {
      throw new Error(`Can't book this event: fully booked`);
    }

    const [first, ...other] = Array.from({ length: people || 1 }).map(() => ({
      id: uuidv4(),
      eventId,
      name,
      instagram,
      phone,
    }));

    const { error } = await supabase.from("bookings").insert([
      first,
      ...other.map((item) => ({
        ...item,
        name: `${item.name} +1`,
      })),
    ]);

    if (error) {
      console.error(error);
      return { error };
    }

    return [first, ...other];
  } catch (error) {
    console.error(error);
    return { error: error.toString() };
  }
};

const handleRequests = async (list, accepted = true) => {
  const { error } = await supabase
    .from("bookings")
    .update({ accepted })
    .in(
      "id",
      list.map(({ id }) => id)
    );

  if (error) {
    console.error(error);
    return { error };
  }

  return list;
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
