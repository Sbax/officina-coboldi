import Link from "next/link";
import About from "../components/about";
import Contacts from "../components/contacts";
import Container from "../components/container";
import EventPreview from "../components/event-preview";
import Layout from "../components/layout";
import PostPreview from "../components/post-preview";
import Strip from "../components/strip";
import { getAllPosts } from "../lib/api";
import { getEvents } from "../lib/sheet";
import indexStyles from "../styles/index.module.scss";
import Footer from "../components/footer";

export default function Index({ allPosts, events }) {
  const startDate = new Date().setUTCHours(0, 0, 0, 0);
  const nextEvents = events.filter(({ date }) => new Date(date) >= startDate);

  return (
    <>
      <Layout skipFooter>
        <Strip>
          <Container className={indexStyles.strip}>
            <h1 className={indexStyles.title}>Le Prossime Sessioni</h1>
            <EventPreview events={nextEvents.slice(-4)} />
            <h2>
              Vuoi giocare con noi, ma tutti i tavoli sono occupati?{" "}
              <Link href="/#contacts">Contattaci</Link>!
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
    revalidate: 5 * 60,
  };
}
