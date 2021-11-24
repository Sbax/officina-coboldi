import Head from "next/head";

const description =
  "Un'associazione dedicata alla promozione e la diffusione del gioco di ruolo nel circondario imolese";
const title = "Officina Coboldi";
const color = "#cb4444";

const defaultValues = {
  title,
  description,
  color,
  facebookImage: "https://officinacoboldi.it/thumbnail-facebook.jpg",
  twitterImage: "https://officinacoboldi.it/thumbnail-twitter.jpg",
};

export default function Meta({
  title = defaultValues.title,
  description = defaultValues.description,
  image,
}) {
  return (
    <Head>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color={defaultValues.color}
      />

      <meta name="msapplication-TileColor" content={defaultValues.color} />
      <meta name="theme-color" content={defaultValues.color} />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      <meta name="title" content={title} key="title" />
      <meta name="description" content={description} key="description" />

      <meta
        name="keywords"
        content="gioco di ruolo, imola, rpg, gdr, roleplay"
      />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://officinacoboldi.it" />

      <meta
        property="og:image"
        content={image || defaultValues.facebookImage}
        key="facebook-image"
      />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />

      <meta
        name="twitter:image"
        content={image || defaultValues.twitterImage}
        key="twitter-image"
      />

      <Title>{title}</Title>
    </Head>
  );
}
