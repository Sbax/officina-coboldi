import { withAuthInfo } from "@propelauth/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "../styles/pending.module.scss";
import Button from "./button";
import Checkbox from "./checkbox";

const fetcher = (url, accessToken) =>
  fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then((res) => res.json());

function Pending({ accessToken, events }) {
  const [requests, setRequests] = useState();
  const { data, error } = useSWR(["/api/requests", accessToken], fetcher);

  const [selected, setSelected] = useState([]);

  const isSelected = ({ id }) => selected.includes(id);
  const toggleSelection = ({ id }) => {
    if (isSelected({ id })) {
      return setSelected(selected.filter((item) => item !== id));
    }

    setSelected([...selected, id]);
  };

  useEffect(() => {
    setRequests((data || []).filter(({ pending }) => pending));
  }, [data]);

  const findEvent = (id) => {
    const event = events.find((event) => event.id === id);

    return `${format(new Date(event.date), "dd MMM yyyy")} - ${
      event.system
    } con ${event.dm.name} `;
  };

  const handleRequest = async (remove = false) => {
    const toSend = requests.filter(({ id }) => selected.includes(id));
    const response = await fetch(`/api/requests`, {
      method: remove ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(toSend),
    });

    if (response.ok) {
      setRequests(requests.filter(({ id }) => !selected.includes(id)));
      setSelected([]);
    }
  };

  if (error) return "Si è verificato un errore";
  if (!data) return "Loading...";
  if (!requests || !requests.length) return "Nessuna richiesta in attesa";

  return (
    <>
      <section className={styles.buttons}>
        <Button primary onClick={() => handleRequest()}>
          Accetta
        </Button>

        <Button onClick={() => handleRequest(true)}>Rifiuta</Button>
      </section>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <Checkbox
                value={requests.length === selected.length}
                indeterminate={
                  selected.length && requests.length !== selected.length
                }
                onChange={() => {
                  if (!selected.length) {
                    return setSelected(requests.map(({ id }) => id));
                  }

                  return setSelected([]);
                }}
              />
            </th>
            <th>Evento</th>
            <th>Nome</th>
            <th>Instagram</th>
            <th>Telefono</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((item, index) => (
            <tr key={`${item.name}-${index}`}>
              <td>
                <div className={styles.checkbox}>
                  <Checkbox
                    value={isSelected(item)}
                    onChange={() => {
                      toggleSelection(item);
                    }}
                  />
                </div>
              </td>
              <td>{findEvent(item.eventId)}</td>
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
