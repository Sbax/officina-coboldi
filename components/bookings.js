import { withAuthInfo } from "@propelauth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "../styles/pending.module.scss";
import DateFormatter from "./date-formatter";

const fetcher = (url, accessToken) =>
  fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then((res) => res.json());

function Pending({ accessToken, event }) {
  const [requests, setRequests] = useState();
  const { data, error } = useSWR(["/api/requests", accessToken], fetcher);

  useEffect(() => {
    setRequests((data || []).filter(({ eventId }) => eventId === event.id));
  }, [data, event]);

  if (error) return "Si è verificato un errore";
  if (!data) return "Loading...";
  if (!requests || !requests.length) return "Nessuna prenotazione";

  return (
    <>
      <h1>
        Prenotazioni per {event.title} (
        <DateFormatter dateString={event.date} />)
      </h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Instagram</th>
            <th>Telefono</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((item, index) => (
            <tr key={`${item.name}-${index}`}>
              <td>{item.name}</td>
              <td>{item.instagram}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default withAuthInfo(Pending);
