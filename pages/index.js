import Link from "next/link";
import { useEffect, useState } from "react";
import About from "../components/about";
import Button from "../components/button";
import Container from "../components/container";
import BookingCard from "../components/event-cards/booking-card";
import EventPreview from "../components/event-preview";
import Footer from "../components/footer";
import Layout from "../components/layout";
import Loader from "../components/loader";
import Meta from "../components/meta";
import PostPreview from "../components/post-preview";
import Strip from "../components/strip";
import Systems from "../components/systems";
import { getAllPosts } from "../lib/api";
import { getEvents } from "../lib/supabase";
import indexStyles from "../styles/index.module.scss";
import { getSystemFromEvents } from "../lib/utils";

const filterNextEvents = (events) => {
  const startDate = new Date().setUTCHours(0, 0, 0, 0);
  const nextEvents = events.filter(({ date }) => new Date(date) >= startDate);

  return nextEvents;
};

const getNextPinnedEvents = (events) =>
  filterNextEvents(events.filter(({ pinned }) => pinned));

const getNextRegularEvents = (events) =>
  filterNextEvents(
    events
      .filter(({ max, booked }) => booked < max)
      .filter(({ pinned }) => !pinned)
  );

export default function Index({ allPosts, events }) {
  const [loading, setLoading] = useState(false);
  const [nextEvents, setNextEvents] = useState(getNextRegularEvents(events));

  const [nextPinnedEvents, setNextPinnedEvents] = useState(
    getNextPinnedEvents(events)
  );

  const systems = getSystemFromEvents(events);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const events = await (await fetch("/api/event")).json();

      if (!events || events.error) {
        setLoading(false);
        return;
      }

      setNextEvents(getNextRegularEvents(events));
      setNextPinnedEvents(getNextPinnedEvents(events));
    } catch (error) {
      console.error("[fetchEvents] caught", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Layout skipFooter>
        <Meta />
        {nextPinnedEvents?.length ? (
          <Strip className={indexStyles.special}>
            {loading ? (
              <div className={indexStyles.loaderOverlay}>
                <div>
                  <Loader />
                </div>
              </div>
            ) : (
              ""
            )}
            <h1 className={indexStyles.title}>Il Prossimo Evento Speciale</h1>
            <Container className={indexStyles.strip}>
              <EventPreview
                showEmpty={false}
                events={nextPinnedEvents.slice(-4).reverse()}
                card={<BookingCard />}
              />
            </Container>
          </Strip>
        ) : (
          ""
        )}
        <Strip primary={!!nextPinnedEvents.length}>
          {loading ? (
            <div
              className={indexStyles.loaderOverlay}
              style={{
                top: nextPinnedEvents.length ? "1em" : 0,
              }}
            >
              <div>
                <Loader />
              </div>
            </div>
          ) : (
            ""
          )}

          <Container className={indexStyles.strip}>
            <h1 className={indexStyles.title}>
              Le Prossime Sessioni {!!nextPinnedEvents.length ? "Regolari" : ""}
            </h1>
            <EventPreview
              events={nextEvents.slice(-4).reverse()}
              card={<BookingCard />}
            />
            <h2>
              <Link href="/events">
                <a alt="Pagina contenente tutti gli eventi">
                  <Button className={indexStyles.link}>
                    Vedi tutti gli eventi
                  </Button>
                </a>
              </Link>
            </h2>

            <h2>
              Vuoi giocare con noi, ma tutti i tavoli sono occupati?{" "}
              <Link href="/#contacts">
                <a alt="Contatti">Contattaci</a>
              </Link>
              !
            </h2>
          </Container>
        </Strip>
        <Container className={indexStyles.about}>
          <a href="#" className={indexStyles.anchor} id="about" />
          <About />
        </Container>
        <section className={indexStyles.systems}>
          <Systems systems={systems} />
        </section>
        <section className={indexStyles.blog}>
          <Container>
            <h1 className={indexStyles.title}>Gli ultimi articoli</h1>
            <PostPreview posts={allPosts.slice(0, 4)} />
            <Link href="/posts">
              <a alt="Blog" className={indexStyles.link}>
                <Button>Vai al blog</Button>
              </a>
            </Link>
          </Container>
        </section>
        <section className={indexStyles.contacts}>
          <a href="#" className={indexStyles.anchor} id="contacts" />
          <Footer />
        </section>
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  const events = await getEvents();
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "content",
    "excerpt",
    "tags",
  ]);

  return {
    props: {
      allPosts,
      events: events.error ? [] : events,
    },
    revalidate: 60,
  };
}
