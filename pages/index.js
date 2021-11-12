import Head from "next/head";
import About from "../components/about";
import Contacts from "../components/contacts";
import Container from "../components/container";
import EventPreview from "../components/event-preview";
import Layout from "../components/layout";
import PostPreview from "../components/post-preview";
import Strip from "../components/strip";
import { getAllPosts } from "../lib/api";
import { CMS_NAME } from "../lib/constants";
import { getEvents } from "../lib/sheet";
import indexStyles from "../styles/index.module.scss";

export default function Index({ allPosts, events }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Officina Coboldi</title>
        </Head>
        <Strip id="play">
          <Container className={indexStyles.strip}>
            <h1 className={indexStyles.title}>Le Prossime Sessioni</h1>
            <EventPreview events={events.slice(0, 4).reverse()} />
            <h2>
              Vuoi giocare con noi, ma tutti i tavoli sono occupati? Contattaci!
            </h2>
          </Container>
        </Strip>
        <Container className={indexStyles.about} id="about">
          <About />
        </Container>
        <section className={indexStyles.blog} id="blog">
          <Container>
            <h1 className={indexStyles.title}>I nostri articoli</h1>
            <PostPreview posts={allPosts} />
          </Container>
        </section>
        <section
          className={indexStyles.contacts}
          id="
        "
        >
          <Container>
            <Contacts />
          </Container>
        </section>
      </Layout>
    </>
  );
}
export async function getServerSideProps() {
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
      events,
    },
  };
}
