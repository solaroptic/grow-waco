import React from "react";
import styles from "../css/generic.module.css";
import { Link } from "react-router-dom";

const Schedule = () => {
  return (
    <div className={styles["container-div"]}>
      <div className={styles["schedule-container-div"]}>
        <h2>City Council Meetings</h2>
        <p>
          Held on the 1st and 3rd Tuesdays of every month Work Session at 3:00
          p.m. Business Session at 6:00 p.m. Waco Convention Center - Bosque
          Theater 100 Washington Aven
        </p>
        <p>
          Current Council Agendas are located on the Meetings on Demand Web
          Page. The meeting agenda and packet are posted the Friday before the
          meeting.
        </p>
        <Link to="https://wacocitytx.iqm2.com/Citizens/Default.aspx">
          City Meetings Info
        </Link>
        <Link to="https://www.waco-texas.com/files/sharedassets/public/v/1/government/documents/20210716_000542_475474_sec__2_189____rules_of_decorum_2.pdf">
          Rules of Decorum
        </Link>
        <Link to="https://www.waco-texas.com/files/sharedassets/public/v/1/government/documents/20210716_001438_176250_sec__2_192____public_speakers1.pdf">
          Info for Speakers
        </Link>
      </div>
    </div>
  );
};

export default Schedule;
