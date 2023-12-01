import Image from "next/image";
import React from "react";
import { getSystemFromEvents } from "../lib/utils";
import teamStyles from "../styles/team.module.scss";

const team = [
  {
    picture: "matteo.png",
    instagram: "heysbax",
    name: "Sbax",
  },
  {
    picture: "gaia.png",
    name: "Gaia",
    instagram: "shanasakaii",
  },
  {
    picture: "tara.png",
    instagram: "sig.tara",
    name: "TARA",
  },
  {
    picture: "matt.png",
    instagram: "matt.sangiuoz",
    name: "Matt",
  },
  {
    picture: "monte.png",
    instagram: "andreamontefiori",
    name: "Monte",
  },
  {
    picture: "barbara.png",
    instagram: "__loverofthelight",
    name: "Barbs",
  },
  {
    picture: "elisa.png",
    instagram: "_elisa_snow",
    name: "Cesira",
  },
  {
    picture: "teo.png",
    name: "Teo",
  },
  {
    picture: "rossella.png",
    name: "Rossella",
  },
];

function Team({ events }) {
  const members = team.map((member) => ({
    ...member,
    systems: getSystemFromEvents(
      events.filter((event) => event.dm?.name === member.name)
    ).slice(0, 3),
  }));

  return (
    <section>
      <h1 className={teamStyles.title}>I membri della nostra associazione</h1>
      <p className={teamStyles.credits}>
        Disegnati da <a href="https://instagram.com/saratatua">@saratatua</a>
      </p>
      <section className={teamStyles.grid}>
        {members.map(({ name, picture, instagram, systems }) => (
          <article key={name}>
            <Image
              src={`/assets/avatar/coboldi/${picture}`}
              alt={name}
              width={380}
              height={380}
            />

            <span>{name}</span>
            {instagram && (
              <a href={`https://instagram.com/${instagram}`}>@{instagram}</a>
            )}

            {!!systems.length && (
              <section className={teamStyles.systems}>
                {systems.map((system) => (
                  <span key={system}>{system}</span>
                ))}
              </section>
            )}
          </article>
        ))}
      </section>
    </section>
  );
}

export default Team;
