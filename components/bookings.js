import { withAuthInfo } from "@propelauth/react";
import { format } from "date-fns";
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

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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

    setLoading(false);
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
    <section>
      <h1 className={styles.title}>
        Prenotazioni per {event.title}
        <br />
        (<DateFormatter dateString={event.date} />)
      </h1>
      <div className={styles.scrollable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Nome</th>
            </tr>
          </thead>

          <tbody>
            {requestsToShow
              .sort((a, b) => new Date(a.created) - new Date(b.created))
              .map((item, index) => (
                <tr key={`${item.name}-${index}`}>
                  <td>{format(new Date(item.created), "dd/MM/yyyy HH:mm")}</td>
                  <td>
                    <div>{item.name}</div>
                    <div>
                      {item.instagram && <div>ig: {item.instagram}</div>}
                      {item.phone && <div>ph: {item.phone}</div>}
                    </div>
                  </td>
                  <td>
                    <Button onClick={() => removeRequest(item.id)}>
                      Rimuovi
                    </Button>
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan={2}>
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
                {!loading && (
                  <Button onClick={() => addRequest()}>Aggiungi</Button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default withAuthInfo(Bookings);
