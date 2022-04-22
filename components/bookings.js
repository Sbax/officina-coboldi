import { withAuthInfo } from "@propelauth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "../styles/pending.module.scss";
import Button from "./button";
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
    setRequests(
      (data || []).filter(
        ({ eventId, accepted }) => accepted && eventId === event.id
      )
    );
  }, [data, event]);

  if (error) return "Si è verificato un errore";
  if (!data) return "Loading...";
  if (!requests || !requests.length) return "Nessuna prenotazione";

  const removeRequest = async (id) => {
    const response = await fetch(`/api/requests`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify([{ id }]),
    });

    if (response.ok) {
      setRequests(requests.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <h1 className={styles.title}>
        Prenotazioni per {event.title} (
        <DateFormatter dateString={event.date} />)
      </h1>
      <div className={styles.scrollable}>
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
                <td>
                  <Button onClick={() => removeRequest(item.id)}>
                    Rimuovi
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default withAuthInfo(Pending);
