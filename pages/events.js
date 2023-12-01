import { format } from "date-fns";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "../components/container";
import BookingCard from "../components/event-cards/booking-card";
import EventPreview from "../components/event-preview";
import Input from "../components/input";
import Layout from "../components/layout";
import Meta from "../components/meta";
import Select from "../components/select";
import Strip from "../components/strip";
import { getEvents } from "../lib/supabase";
import eventStyles from "../styles/events.module.scss";
import { getSystemFromEvents } from "../lib/utils";

export default function Events({ events }) {
  const router = useRouter();
  const minDate = events.length
    ? new Date(
        Math.min.apply(
          null,
          events.map(({ date }) => new Date(date))
        )
      )
    : new Date();

  const systems = getSystemFromEvents(events);

  const { date, search, system, place, endDate } = router.query;

  const updateFilters = ({
    date = router.query.date,
    endDate = router.query.endDate,
    search = router.query.search,
    system = router.query.system,
    place = router.query.place,
  }) => {
    const query = {};

    if (date || date === "") query.date = date;
    if (endDate || endDate === "") query.endDate = endDate;
    if (system || system === "") query.system = system;
    if (search || search === "") query.search = search;
    if (place || place === "") query.place = place;

    Router.replace({
      pathname: "/events",
      query,
    });
  };

  const setDate = (date) => updateFilters({ date });
  const setSearch = (search) => updateFilters({ search });
  const setSystem = (system) => updateFilters({ system });

  const filtered = events
    .filter(
      (event) =>
        new Date(event.date) >=
        new Date(date || format(new Date(), "yyyy-MM-dd"))
    )
    .filter((event) =>
      endDate
        ? new Date(event.date) <=
          new Date(endDate || format(new Date(), "yyyy-MM-dd"))
        : true
    )
    .filter(
      ({ title, dm, description }) =>
        title.toLowerCase().includes(search || "") ||
        dm.name?.toLowerCase().includes(search || "") ||
        description?.toLowerCase().includes(search || "")
    )
    .filter((event) => !system || event.system === system)
    .filter((event) =>
      event.place.name.toLowerCase().includes((place || "").toLowerCase())
    )
    .reverse();

  return (
    <>
      <Layout>
        <Meta
          title="Eventi"
          description="Tutte le serate in cui partecipare alle nostre sessioni"
        />
        <section className={eventStyles.wrapper}>
          <Strip className={eventStyles.strip}>
            <Container className={eventStyles.filters}>
              <section>
                <label>Dalla data</label>
                <Input
                  type="date"
                  value={date || format(new Date(), "yyyy-MM-dd")}
                  onChange={({ target }) => setDate(target.value)}
                  min={format(minDate, "yyyy-MM-dd")}
                />
              </section>

              <section>
                <label>con sistema</label>
                <Select
                  value={system}
                  onChange={({ target }) => setSystem(target.value)}
                >
                  <option value={""}>Qualsiasi</option>
                  {systems.sort().map((system) => (
                    <option key={system} value={system}>
                      {system}
                    </option>
                  ))}
                </Select>
              </section>

              <section>
                <label>contenente</label>
                <Input
                  type="text"
                  placeholder="Ricerca..."
                  value={search}
                  onChange={({ target }) =>
                    setSearch(target.value.toLowerCase())
                  }
                />
              </section>
            </Container>
          </Strip>

          <Container className={eventStyles.results}>
            {filtered.length ? (
              <EventPreview events={filtered} card={<BookingCard />} />
            ) : (
              <section className={eventStyles.empty}>
                <span>Nessun evento trovato</span>
                <div>{"o͡╮༼  ಠДಠ ༽╭o͡━☆ﾟ.*･｡ﾟ"}</div>
                <span>
                  Se l&apos;avventura che cerchi non è disponibile,{" "}
                  <Link href="/#contacts">
                    <a alt="Contatti">contattaci</a>
                  </Link>
                  !
                </span>
              </section>
            )}
          </Container>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const events = await getEvents();
  return {
    props: {
      events: events.error ? [] : events,
    },
  };
}
