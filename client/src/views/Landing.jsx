import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import TallyBoard from "../components/TallyBoard";
import { FaRegBell } from "react-icons/fa";
import { useSelector } from "react-redux";

import Footer from "../components/Footer";
import styles from "../css/landing.module.css";
import Designs from "../components/Designs";

const Landing = () => {
  const [hasNotifications, setHasNotifications] = useState(false);
  const location = useLocation();
  const token = useSelector((state) => state.user.token);
  return (
    <div className={styles["container-div"]}>
      <Nav />
      <Designs />
      <section className={styles["proposal-section"]}>
        {hasNotifications && (
          <p className={styles["proposal-notify"]}>
            <FaRegBell />
            New comments on your proposal!
          </p>
        )}
        {location.pathname === "/" && <h2>Proposals📣</h2>}
        {location.pathname === "/" && (
          <TallyBoard setHasNotifications={setHasNotifications} />
        )}
        <Outlet />
      </section>
      <section className={styles["button-section"]}>
        {token && location.pathname === "/" && (
          <button>
            <Link to="/proposal">Propose🌱</Link>
          </button>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
