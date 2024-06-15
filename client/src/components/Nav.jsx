import React from "react";
import styles from "../css/nav.module.css";
import { Link } from "react-router-dom";
import { logoutUser } from "../utility/userSlice";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/GrowLogo.avif";

const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <header className={styles["container-div"]}>
        <h1 className={styles["container-h1"]}>
          <Link to="/">
            <img src={logo} className={styles["link-logo"]} />{" "}
            <span>Grow Waco</span>
          </Link>
        </h1>
        <section className={styles["link-section"]}>
          {user && <Link to="/user">{user.userName}</Link>}
          {!user && <Link to="/login">Login</Link>}
          {user && (
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          )}
          <Link to="/about">About</Link>
          <Link to="/schedule">Schedule</Link>
        </section>
      </header>
    </>
  );
};

export default Nav;
