import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react/cjs/react.development";
import Container from "../components/container";
import EventPreview from "../components/event-preview";
import Footer from "../components/footer";
import Input from "../components/input";
import Layout from "../components/layout";
import Select from "../components/select";
import Strip from "../components/strip";
import { getEvents } from "../lib/sheet";
import eventStyles from "../styles/events.module.scss";

export default function Events({ events }) {
  const minDate = new Date(
    Math.min.apply(
      null,
      events.map(({ date }) => new Date(date))
    )
  );

  const systems = Array.from(new Set([...events.map(({ system }) => system)]));

  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [search, setSearch] = useState("");
  const [system, setSystem] = useState("");

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(
      events
        .filter((event) => new Date(event.date) >= new Date(date))
        .filter(
          ({ title, dm }) =>
            title.toLowerCase().includes(search) ||
            dm.toLowerCase().includes(search)
        )
        .filter((event) => system === "" || event.system === system)
    );
  }, [date, search, system]);

  return (
    <>
      <Layout>
        <section className={eventStyles.wrapper}>
          <Strip className={eventStyles.strip}>
            <Container className={eventStyles.filters}>
              <section>
                <label>Dalla data</label>
                <Input
                  type="date"
                  value={date}
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
                  {systems.map((system) => (
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
              <EventPreview events={filtered} />
            ) : (
              <section className={eventStyles.empty}>
                <span>Nessun evento trovato</span>
                <div>{"o͡╮༼  ಠДಠ ༽╭o͡━☆ﾟ.*･｡ﾟ"}</div>
                <span>
                  Se l'avventura che cerchi non è disponibile,{" "}
                  <Link href="/#contacts">contattaci</Link>!
                </span>
              </section>
            )}
          </Container>

          <Footer />
        </section>
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  const events = await getEvents();
  return {
    props: {
      events: events.error ? [] : events,
    },
    revalidate: 5 * 60,
  };
}
