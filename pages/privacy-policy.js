import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import Strip from "../components/strip";
import postStyles from "../styles/post.module.scss";
import pageStyles from "../styles/page.module.scss";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | Officina Coboldi</title>
      </Head>
      <Strip primary className={pageStyles.strip}>
        <Container>
          <section className={pageStyles.details}>
            <h1 className={pageStyles.title}>Privacy Policy</h1>
          </section>
        </Container>
      </Strip>
      <Container>
        <section className={postStyles.content}>
          <p>
            Ai sensi dell'art. 13 del Regolamento UE 2016/679 ed in d in
            relazione alle informazioni di cui si entrerà in possesso, ai fini
            della tutela delle persone e altri soggetti in materia di
            trattamento di dati personali, si informa quanto segue:
          </p>

          <p>
            <b>Finalità del trattamento</b>
          </p>

          <p>
            I dati da Lei forniti verrano utilizzati allo scopo e per il fine di
            garantire l'organizzazione necessaria per la partecipazione ad
            eventi ed attività dell'associazione Officina Coboldi
          </p>

          <p>
            <b>Conferimento dei dati</b>
          </p>

          <p>
            Il conferimento dei dati per le finalità di cui al punto 1 sono
            obbligatori al fine di garantire il servizio e l'eventuale rifiuto
            comporta l'impossibilità di partecipare agli eventi e alle attività
            dell'associazione Officina Coboldi
          </p>

          <p>
            <b>Titolare del Trattamento</b>
          </p>

          <p>
            Il titolare del trattamento dei dati personali è Matteo Bacci e può
            essere contattato a info@officinacoboldi.it
          </p>

          <p>
            <b>Diritti dell'interessato</b>
          </p>

          <p>
            In ogni momento, Lei potrà esercitare, ai sensi degli articoli dal
            15 al 22 del Regolamento UE n. 2016/679, il diritto di:
            <ul>
              <li>
                chiedere la conferma dell'esistenza o meno di propri dati
                personali;
              </li>
              <li>
                ottenere le indicazioni circa le finalità del trattamento, le
                categorie dei dati personali, i destinatari o le categorie di
                destinatari a cui i dati personali sono stati o saranno
                comunicati e, quando possibile, il periodo di conservazione;
              </li>
              <li>ottenere la rettifica e la cancellazione dei dati;</li>
              <li>ottenere la limitazione del trattamento;</li>
              <li>
                ottenere la portabilità dei dati, ossia riceverli da un titolare
                del trattamento, in un formato strutturato, di uso comune e
                leggibile da dispositivo automatico, e trasmetterli ad un altro
                titolare del trattamento senza impedimenti;
              </li>
              <li>
                opporsi al trattamento in qualsiasi momento ed anche nel caso di
                trattamento per finalità di marketing diretto;
              </li>
              <li>
                opporsi ad un processo decisionale automatizzato relativo alle
                persone fisiche, compresa la profilazione.
              </li>
              <li>
                chiedere al titolare del trattamento l'accesso ai dati personali
                e la rettifica o la cancellazione degli stessi o la limitazione
                del trattamento che lo riguardano o di opporsi al loro
                trattamento, oltre al diritto alla portabilità dei dati;
              </li>
              <li>
                revocare il consenso in qualsiasi momento senza pregiudicare la
                liceità del trattamento basata sul consenso prestato prima della
                revoca;
              </li>
              <li>proporre reclamo a un'autorità di controllo.</li>
            </ul>
          </p>

          <p>
            Può esercitare i Suoi diritti all'indirizzo mail mail
            info@officinacoboldi.it.
          </p>
        </section>
      </Container>
    </Layout>
  );
}
