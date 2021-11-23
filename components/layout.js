import Meta from "../components/meta";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <main>
      <Meta />
      <Header />
      {children}
    </main>
  );
}
