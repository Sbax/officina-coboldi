import { withAuthInfo } from "@propelauth/react";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/pending.module.scss";
import { AdminContext } from "./admin-wrapper";
import Button from "./button";
import Checkbox from "./checkbox";

function Pending({ accessToken }) {
  const [selected, setSelected] = useState([]);

  const { events, setEvents, requests, setRequests } = useContext(AdminContext);

  const [requestsToShow, setRequestsToShow] = useState([]);

  useEffect(() => {
    setRequestsToShow(requests.filter(({ accepted }) => accepted === null));
  }, [requests]);

  const isSelected = ({ id }) => selected.includes(id);
  const toggleSelection = ({ id }) => {
    if (isSelected({ id })) {
      return setSelected(selected.filter((item) => item !== id));
    }

    setSelected([...selected, id]);
  };

  const findEvent = (id) => {
    const event = events.find((event) => event.id === id);
    if (!event) {
      return;
    }

    return `${format(new Date(event.date), "dd MMM yyyy")} - ${
      event.system
    } con ${event.dm.name} `;
  };

  const handleRequest = async (remove = false) => {
    const toSend = requestsToShow.filter(({ id }) => selected.includes(id));
    const response = await fetch(`/api/requests`, {
      method: remove ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(toSend),
    });

    if (response.ok) {
      setRequests(
        requests.map((request) => {
          if (selected.includes(request.id)) {
            return {
              ...request,
              accepted: !remove,
            };
          }

          return request;
        })
      );

      if (!remove) {
        const changes = requests
          .filter(({ id }) => selected.includes(id))
          .reduce((aggregated, item) => {
            if (!aggregated[item.eventId]) {
              aggregated[item.eventId] = 1;
            } else {
              aggregated[item.eventId] += 1;
            }

            return aggregated;
          }, {});

        setEvents(
          events.map((event) => ({
            ...event,
            booked: event.booked + (changes[event.id] || 0),
          }))
        );
      }

      setSelected([]);
    }
  };

  if (!requestsToShow || !requestsToShow.length)
    return "Nessuna richiesta in attesa";

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
                value={requestsToShow.length === selected.length}
                indeterminate={
                  selected.length && requestsToShow.length !== selected.length
                }
                onChange={() => {
                  if (!selected.length) {
                    return setSelected(requestsToShow.map(({ id }) => id));
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
          {requestsToShow.map((item, index) => (
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
