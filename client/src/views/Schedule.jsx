import React from "react";
import styles from "../css/generic.module.css";

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

        <a>https://wacocitytx.iqm2.com/Citizens/Default.aspx</a>

        <p>Rules of Decorum</p>

        <a>
          https://www.waco-texas.com/files/sharedassets/public/v/1/government/documents/20210716_000542_475474_sec__2_189____rules_of_decorum_2.pdf
        </a>

        <p>Public Speaker Info</p>

        <a>
          https://www.waco-texas.com/files/sharedassets/public/v/1/government/documents/20210716_001438_176250_sec__2_192____public_speakers1.pdf
        </a>
      </div>
    </div>
  );
};

export default Schedule;
