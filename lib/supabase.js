import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const bookingsTable = process.env.BOOKINGS_TABLE || "bookings";
const eventsTable = process.env.EVENTS_TABLE || "events";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const mapEvent = (
  {
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
    description,
    pinned = false,
    hide = false,
    info = false,
  },
  requests
) => ({
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
  booked: !requests
    ? 0
    : requests.filter(({ eventId, accepted }) => accepted && eventId === id)
        .length,
  reservationLink,
  description,
  pinned,
  hide,
  info,
});

const getEvents = async (showHidden) => {
  const { data: events, error: eventsError } = showHidden
    ? await supabase
        .from(eventsTable)
        .select("*")
        .order("created", { ascending: false })
    : await supabase
        .from(eventsTable)
        .select("*")
        .is("hide", false)
        .order("created", { ascending: false });

  const { data: requests, error: requestsError } = await supabase
    .from(bookingsTable)
    .select("accepted,eventId")
    .order("created", { ascending: false });

  if (eventsError || requestsError) {
    console.error("[getEvents] caught:", eventsError || requestsError);

    return { error: eventsError || requestsError };
  }

  return events
    .map((event) => mapEvent(event, requests))
    .sort(
      (a, b) =>
        new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
    );
};

const getRequests = async () => {
  const { data: requests, error } = await supabase
    .from(bookingsTable)
    .select("*")
    .order("created", { ascending: false });

  if (error) {
    console.error("[getRequests] caught:", error);

    return { error };
  }

  return requests
    .map(({ id, eventId, name, instagram, phone, accepted }) => ({
      id,
      eventId,
      name,
      instagram,
      phone,
      accepted,
      pending: accepted !== true && accepted !== false,
    }))
    .filter(({ eventId }) => eventId);
};

const addEvent = async (body) => {
  const payload = {
    id: uuidv4(),
    ...body,
  };

  const { error } = await supabase.from(eventsTable).insert([payload]);

  if (error) {
    console.error("[addEvent] caught:", error);
    return { error };
  }

  return mapEvent(payload);
};

const updateEvent = async ({ id, ...body }) => {
  const { error } = await supabase.from(eventsTable).update(body).eq("id", id);

  if (error) {
    console.error("[updateEvent] caught:", error);
    return { error };
  }

  return mapEvent({ id, ...body });
};

const deleteEvent = async (id) => {
  const { error } = await supabase.from(eventsTable).delete().match({ id });

  if (error) {
    return { error };
  }

  return { id };
};

const addRequest = async (body, loggedIn) => {
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
      .from(eventsTable)
      .select("*")
      .eq("id", event.id)
      .order("created", { ascending: false });

    const [current] = events;

    const { data: requests, error: requestsError } = await supabase
      .from(bookingsTable)
      .select("accepted,eventId")
      .eq("eventId", current.id)
      .eq("accepted", true)
      .order("created", { ascending: false });

    if (!loggedIn && (eventsError || requestsError)) {
      throw new Error(`Can't book this event: event not found`);
    }

    const startTime = new Date(current.date);
    const [hours, minutes] = current.time.split(":");
    startTime.setHours(hours);
    startTime.setMinutes(minutes);

    if (!loggedIn && startTime < new Date()) {
      throw new Error(`Can't book this event: event in the past`);
    }

    if (!loggedIn && current.reservationLink) {
      throw new Error(`Can't book this event: reservation link`);
    }

    if (
      !loggedIn &&
      (requests.length >= parseInt(current.max) ||
        requests.length + (parseInt(people) || 1) > parseInt(current.max))
    ) {
      throw new Error(`Can't book this event: fully booked`);
    }

    const [first, ...other] = Array.from({ length: parseInt(people) || 1 }).map(
      () => ({
        id: uuidv4(),
        eventId,
        name,
        instagram,
        phone,
        accepted: loggedIn || null,
      })
    );

    const { error } = await supabase.from(bookingsTable).insert([
      first,
      ...other.map((item) => ({
        ...item,
        name: `${item.name} +1`,
      })),
    ]);

    if (error) {
      console.error("[addRequest] caught", error);
      return { error };
    }

    return [first, ...other];
  } catch (error) {
    console.error("[addRequest] caught", error);
    return { error: error.toString() };
  }
};

const handleRequests = async (list, accepted = true) => {
  const { error } = await supabase
    .from(bookingsTable)
    .update({ accepted })
    .in(
      "id",
      list.map(({ id }) => id)
    );

  if (error) {
    console.error("[addRequest] caught", error);
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
  deleteEvent,
  acceptRequests,
  deleteRequests,
};
