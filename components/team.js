import Image from "next/image";
import teamStyles from "../styles/team.module.scss";

const team = [
  {
    picture: "matteo.png",
    instagram: "heysbax",
    name: "Matteo",
  },
  {
    picture: "will.png",
    instagram: "__.am.i.will.__",
    name: "Will",
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
    picture: "dawid.png",
    instagram: "a3kold",
    name: "Dawid",
  },
  {
    picture: "mich.png",
    instagram: "michh.png",
    name: "Mitch",
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
];

function Team() {
  return (
    <section>
      <h1 className={teamStyles.title}>I membri della nostra associazione</h1>
      <p className={teamStyles.credits}>
        Disegnati da <a href="https://instagram.com/saratatua">@saratatua</a>
      </p>
      <section className={teamStyles.grid}>
        {team.map(({ name, picture, instagram }) => (
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
          </article>
        ))}
      </section>
    </section>
  );
}

export default Team;
