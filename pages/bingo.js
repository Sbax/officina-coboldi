import { toPng } from "html-to-image";
import { useEffect, useRef, useState } from "react";
import Button from "../components/button";
import PageWrapper from "../components/page-wrapper";
import bingoStyles from "../styles/bingo.module.scss";

export default function Bingo() {
  const shuffle = (array) => array.sort(() => 0.5 - Math.random());

  const characterOptions = [
    "forte",
    "agile",
    "saggio",
    "intelligente",
    "carismatico",
  ];

  const classOptions = [
    "bardo",
    "chierico",
    "druido",
    "ladro",
    "guerriero",
    "incantatore",
  ];

  const genreOptions = [
    "fantasy",
    "sci-fi",
    "horror",
    "supereroistico",
    "di genere rosa",
    "di avventura",
    "investigativo",
  ];

  const settingOptions = [
    "high fantasy",
    "dark fantasy",
    "low magic",
    "cyberpunk",
    "noir",
    "post apocalittico",
    "steampunk",
  ];

  const releaseDateOptions = [
    "uscito quest'anno",
    "in quickstart",
    "ancora in crowfunding",
    "uscito almeno da 2 anni",
    "molto vecchio",
  ];

  const playWithOptions = ["Gaia", "Matteo", "Mattia", "TARA", "William"];

  const alternatives = ["Gioca a", "Mastera"];

  const generateOptions = () => {
    const characters = shuffle([...characterOptions]);
    const classes = shuffle([...classOptions]);

    const genres = shuffle([...genreOptions]);
    const settings = shuffle([...settingOptions]);
    const releaseDates = shuffle([...releaseDateOptions]);
    const playWith = shuffle([...playWithOptions]);

    return Array.from({ length: 5 }, () => {
      const generate = (array) => {
        const [pick] = shuffle([...alternatives]);

        return `${pick} un gioco ${array.pop()}`;
      };

      return [
        `Gioca un personaggio ${characters.pop()}`,
        `Gioca un ${classes.pop()}`,
        `Gioca con ${playWith.pop()}`,
        generate(genres),
        generate(settings),
        generate(releaseDates),
      ];
    })
      .map(shuffle)
      .map((array) => array.slice(0, 3));
  };

  const [options, setOptions] = useState([]);
  const [currentImage, setCurrentImage] = useState();

  const componentToPrint = useRef();

  const generateImage = () => {
    if (!currentImage) return;

    const link = document.createElement("a");
    link.download = "Officina Coboldi - Challenge.png";
    link.href = currentImage;
    link.click();
    link.delete;
  };

  const createNewImage = () => {
    setOptions(generateOptions());
  };

  useEffect(() => {
    if (!options.length) return;
    if (componentToPrint.current === null) {
      return;
    }

    toPng(componentToPrint.current, {
      width: 1080,
      height: 1920,
      windowWidth: 1080,
      windowHeight: 1920,
    }).then((dataUrl) => {
      setCurrentImage(dataUrl);
    });
  }, [options]);

  useEffect(() => {
    if (currentImage) return;
    createNewImage();
  }, [currentImage]);

  return (
    <PageWrapper title="Bingo" hideStrip>
      <section className={bingoStyles.container}>
        <header className={bingoStyles.buttons}>
          <div>
            <Button primary onClick={() => createNewImage()}>
              Dammene un altro!
            </Button>
          </div>

          <div>
            <Button onClick={generateImage}>Salva l&apos;immagine</Button>
          </div>
        </header>

        <div className={bingoStyles.printWrapper}>
          <section
            className={bingoStyles.printContainer}
            ref={componentToPrint}
          >
            <section className={bingoStyles.wrapper}>
              <img className={bingoStyles.logo} src="/assets/logo.png" />

              <div className={bingoStyles.grid}>
                {options.map((row) =>
                  row.map((column) => (
                    <div key={column} className={bingoStyles.gridItems}>
                      {column}
                    </div>
                  ))
                )}
              </div>

              <footer className={bingoStyles.attribution}>
                <div>@officinacoboldi</div>

                <div>officinacoboldi.it</div>
              </footer>
            </section>
          </section>
        </div>

        <section className={bingoStyles.imageContainer}>
          {currentImage && <img src={currentImage} />}
        </section>
      </section>
    </PageWrapper>
  );
}
