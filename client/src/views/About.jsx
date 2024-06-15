import bridge from "../assets/bridge2.avif";
import styles from "../css/generic.module.css";

const About = () => {
  return (
    <div className={styles["container-div"]}>
      <div className={styles["about-container-div"]}>
        <img className={styles["bridge"]} src={bridge} alt="bridge" />
        <h2>Mission of Grow Waco</h2>

        <p>
          To provide an informal bridge between the people of this town and it's
          government
        </p>

        <p>
          A dedicated virtual suggestion box to allow us to impart some of our
          collective personality into Waco
        </p>
        <p>
          To provide a uniquely positioned window for city council on some of
          the views and concerns of the community that aren't always reflected
          in City Hall discussions
        </p>
        <h3>How it works</h3>
        <p>
          The general aim is to poll the city and present the results to the
          City Council.
        </p>
        <p>
          There will be an incubation period to allow for a substantial number
          of votes to accumulate.
        </p>
        <p>
          In communication with the city, we will assume a cumulative total
          reaching ~1,500 (~1% of the pop.) would be worthy of presentation. We
          could, in leiu of higher numbers, present proposals leading after each
          quarter.
        </p>
        <p>
          To keep everyone from simply voting for their own proposal and
          creating a high-bandwidth/low-leader-count situation, everyone is
          required to cast 2 votes. We use e-mail registering to prevent
          fraudulent voting.
        </p>
      </div>
    </div>
  );
};

export default About;
