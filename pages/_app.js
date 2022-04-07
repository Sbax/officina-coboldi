import { AuthProvider } from "@propelauth/react";
import "../styles/global.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider authUrl={process.env.NEXT_PUBLIC_PROPEL_AUTH_URL}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
