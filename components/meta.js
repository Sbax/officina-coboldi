import Head from "next/head";
import { useRouter } from "next/router";

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

export default function Meta({ ...props }) {
  const { pathname } = useRouter();

  const title = props.title
    ? `${props.title} | ${defaultValues.title}`
    : defaultValues.title;

  const description = props.description || defaultValues.description;

  const { image } = props;

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

      <link
        rel="sitemap"
        type="application/xml"
        title="Sitemap"
        href="/sitemap.xml"
      />

      <title>{title}</title>
      <meta name="title" content={title} key="title" />
      <meta name="description" content={description} key="description" />

      <link rel="canonical" href={`https://officinacoboldi.it${pathname}`} />

      <meta
        name="keywords"
        content="gioco di ruolo, imola, rpg, gdr, roleplay"
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:url"
        content={`https://officinacoboldi.it${pathname}`}
      />
      <meta property="og:site_name" content="Officina Coboldi" />

      <meta
        property="og:image"
        content={image || defaultValues.facebookImage}
        key="facebook-image"
      />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@OfficinaCoboldi" />
      <meta name="twitter:creator" content="@OfficinaCoboldi" />

      <meta
        name="twitter:image"
        content={image || defaultValues.twitterImage}
        key="twitter-image"
      />
    </Head>
  );
}
