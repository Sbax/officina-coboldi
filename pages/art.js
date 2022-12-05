import PageWrapper from "../components/page-wrapper";
import PostBody from "../components/post-body";
import postStyles from "../styles/post.module.scss";
import artStyles from "../styles/art.module.scss";

export default function Art() {
  return (
    <PageWrapper title={"Artwork"}>
      <section className={postStyles.content}>
        <section>
          <article className={artStyles.article}>
            <section>
              <img src="/assets/artworks/Logo.png" />
            </section>
            <section>
              <h1>Il logo ufficiale di Officina Coboldi</h1>
              <h2>
                Realizzato da{" "}
                <a href="https://instagram.com/michh.png/">@micch.png</a>
              </h2>
            </section>
          </article>

          <article className={artStyles.article}>
            <section>
              <img src="/assets/artworks/Primo.png" />
            </section>
            <section>
              <h1>Il primo artwork promozionale</h1>
              <h2>
                Realizzato da{" "}
                <a href="https://instagram.com/saratatua/">@saratatua</a>
              </h2>
            </section>
          </article>

          <article className={artStyles.article}>
            <section>
              <img src="/assets/artworks/Avatar.png" />
            </section>
            <section>
              <h1>La prima versione degli avatar dei Coboldi</h1>
              <h2>
                Realizzati da{" "}
                <a href="https://instagram.com/saratatua/">@saratatua</a>
              </h2>
            </section>
          </article>

          <article className={artStyles.article}>
            <section>
              <img src="/assets/artworks/Hellfire Club.png" />
            </section>
            <section>
              <h1>Una rivisitazione della T-Shirt dell&apos;Hellfire Club</h1>
              <h2>
                Realizzata da{" "}
                <a href="https://instagram.com/saratatua/">@saratatua</a>
              </h2>
            </section>
          </article>

          <article className={artStyles.article}>
            <section>
              <img src="/assets/artworks/CoboldiAlBuio.png" />
            </section>
            <section>
              <h1>
                Illustrazione per il nostro evento <i>al buio</i>
              </h1>
              <h2>
                Realizzata da{" "}
                <a href="https://instagram.com/saratatua/">@saratatua</a>
              </h2>
            </section>
          </article>

          <article className={artStyles.article}>
            <section>
              <img src="/assets/artworks/NoteDiRuolo.jpg" />
            </section>
            <section>
              <h1>Illustrazione per il nostro evento per Imola in Musica</h1>
              <h2>
                Realizzata da{" "}
                <a href="https://instagram.com/_riccardogiannini_/">
                  @_riccardogiannini_
                </a>
              </h2>
            </section>
          </article>

          <article className={artStyles.article}>
            <section>
              <img src="/assets/artworks/Halloween.jpg" />
            </section>
            <section>
              <h1>Illustrazione per il nostro evento di Halloween 2022</h1>
              <h2>
                Realizzata da{" "}
                <a href="https://instagram.com/michh.png/">@micch.png</a>
              </h2>
            </section>
          </article>

          <article className={artStyles.article}>
            <section>
              <img src="/assets/artworks/Compleanno.jpg" />
            </section>
            <section>
              <h1>Illustrazione per il nostro primo compleanno</h1>
              <h2>
                Realizzata da{" "}
                <a href="https://instagram.com/michh.png/">@micch.png</a>
              </h2>
            </section>
          </article>
        </section>
      </section>
    </PageWrapper>
  );
}
