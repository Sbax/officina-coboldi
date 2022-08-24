import { withAuthInfo } from "@propelauth/react";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/pending.module.scss";
import { AdminContext } from "./admin-wrapper";
import Button from "./button";
import DateFormatter from "./date-formatter";
import Input from "./input";

function Bookings({ accessToken, event }) {
  const [name, setName] = useState({ value: "" });

  const { requests, setRequests, events, setEvents } = useContext(AdminContext);
  const [requestsToShow, setRequestsToShow] = useState([]);

  useEffect(() => {
    setRequestsToShow(
      requests.filter(
        ({ eventId, accepted }) => accepted && event.id === eventId
      )
    );
  }, [requests]);

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

      setEvents(
        events.map((current) => {
          if (current.id === event.id) {
            return {
              ...current,
              booked: current.booked - 1,
            };
          }

          return current;
        })
      );
    }
  };

  const addRequest = async () => {
    const response = await fetch(`/api/requests`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id: event.id,
        event,
        people: 1,
        name: name.value,
        instagram: name.value,
      }),
    });

    if (response.ok) {
      setName({ value: "" });

      const newRequests = await response.json();
      setRequests([...requests, ...newRequests]);

      setEvents(
        events.map((current) => {
          if (current.id === event.id) {
            return {
              ...current,
              booked: current.booked + 1,
            };
          }

          return current;
        })
      );
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
            {requestsToShow.map((item, index) => (
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
            <tr>
              <td colSpan={3}>
                <Input
                  value={name.value}
                  onChange={({ target }) =>
                    setName({
                      value: target.value,
                    })
                  }
                  id="name"
                  type="text"
                  placeholder="Nome"
                />
              </td>
              <td>
                <Button onClick={() => addRequest()}>Aggiungi</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default withAuthInfo(Bookings);
