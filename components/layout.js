import Meta from "../components/meta";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children, skipFooter = false }) {
  return (
    <main>
      <Meta />
      <Header />
      {children}
      {!skipFooter && <Footer />}
    </main>
  );
}
