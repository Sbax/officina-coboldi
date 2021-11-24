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
  return (
    <>
      <Layout skipFooter>
        <Strip>
          <a className={indexStyles.anchor} id="play" />
          <Container className={indexStyles.strip}>
            <h1 className={indexStyles.title}>Le Prossime Sessioni</h1>
            <EventPreview events={events.slice(0, 4)} />
            <h2>
              Vuoi giocare con noi, ma tutti i tavoli sono occupati?{" "}
              <Link href="/#contacts">Contattaci</Link>!
            </h2>
          </Container>
        </Strip>
        <Container className={indexStyles.about}>
          <a className={indexStyles.anchor} id="about" />
          <About />
        </Container>
        <section className={indexStyles.blog}>
          <a className={indexStyles.anchor} id="blog" />
          <Container>
            <h1 className={indexStyles.title}>I nostri articoli</h1>
            <PostPreview posts={allPosts.slice(0, 4)} />
          </Container>
        </section>
        <section className={indexStyles.contacts}>
          <a className={indexStyles.anchor} id="contacts" />
          <Container>
            <Contacts />
            <Footer />
          </Container>
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
  ]);

  return {
    props: {
      allPosts,
      events: events.error ? [] : events,
    },
    revalidate: 5 * 60,
  };
}
