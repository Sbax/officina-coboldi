import Footer from "./footer";
import Header from "./header";

export default function Layout({ children, skipFooter = false }) {
  return (
    <main>
      <Header />
      {children}
      {!skipFooter && <Footer />}
    </main>
  );
}
