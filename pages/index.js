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
import { getAllPosts } from "../lib/api";
import { getEvents } from "../lib/supabase";
import indexStyles from "../styles/index.module.scss";

export default function Index({ allPosts, events }) {
  const startDate = new Date().setUTCHours(0, 0, 0, 0);

  const [loading, setLoading] = useState(false);
  const [nextEvents, setNextEvents] = useState(
    events
      .filter(({ date }) => new Date(date) >= startDate)
      .filter(({ max, booked }) => booked < max)
  );

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const events = await (await fetch("/api/event")).json();

      setNextEvents(
        events
          .filter(({ date }) => new Date(date) >= startDate)
          .filter(({ max, booked }) => booked < max)
      );
    } catch (error) {
      console.error(error);
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
        <Strip>
          <Container className={indexStyles.strip}>
            <h1 className={indexStyles.title}>Le Prossime Sessioni</h1>
            {loading ? (
              <div className={indexStyles.loaderOverlay}>
                <div>
                  <Loader />
                </div>
              </div>
            ) : (
              ""
            )}
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
