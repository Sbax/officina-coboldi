import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AuthProvider } from "@propelauth/react";
import "../styles/global.scss";
config.autoAddCss = false;

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider authUrl={process.env.NEXT_PUBLIC_PROPEL_AUTH_URL}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
