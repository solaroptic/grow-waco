import React, { useState } from "react";
import { useAddUserMutation } from "../api/userApiSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "../css/generic.module.css";

const Register = () => {
  const [isShow, setIsShow] = useState(false);
  const [userName, setUserName] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [mutate] = useAddUserMutation();
  const navigate = useNavigate();
  const toastOptions = {
    duration: 3000,
    position: "top-center",
    style: { color: "#4cb944", border: "4px solid #246eb9" },
    icon: "📨",
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  };

  const inputHandler = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast("Passwords don't match!", toastOptions);
      return;
    }
    try {
      const response = await mutate({ userName, email, password, industry });
      if (response.error) {
        toast.error(response.error.data.message, toastOptions);
      }
      if (response.data) {
        toast.success("Check your email to verify", toastOptions);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      toast.error("An unexpected error has occurred", toastOptions);
    }
  };

  return (
    <div className={styles["signin-container-div"]}>
      <Toaster />
      <form className={styles["login-form"]} onSubmit={(e) => handleSubmit(e)}>
        <h2>Sign Up!</h2>
        <section>
          <label className={styles["login-labels"]}>Username</label>
          <input
            className={styles["login-inputs"]}
            placeholder="Create a username"
            type="text"
            label="userName"
            name="userName"
            required
            maxLength={12}
            minLength={4}
            onChange={(e) => inputHandler(e, setUserName)}
          />
        </section>
        <section>
          <label className={styles["login-labels"]}>Email</label>
          <input
            className={styles["login-inputs"]}
            placeholder="JohnDoe@gmail.com"
            type="email"
            label="email"
            name="email"
            required
            maxLength={35}
            minLength={10}
            onChange={(e) => inputHandler(e, setEmail)}
          />
        </section>
        <section>
          <label className={styles["login-labels"]}>Industry</label>
          <input
            className={styles["login-inputs"]}
            placeholder="Optional: Area of experience/work"
            type="text"
            label="industry"
            name="industry"
            maxLength={16}
            minLength={2}
            onChange={(e) => inputHandler(e, setIndustry)}
          />
        </section>
        <section>
          <label className={styles["login-labels"]}>Password</label>
          <div className={styles["login-inputs-show"]}>
            <input
              className={styles["login-inputs"]}
              placeholder="create a password"
              label="Password"
              type={isShow ? "text" : "password"}
              name="password"
              required
              maxLength={32}
              minLength={8}
              onChange={(e) => inputHandler(e, setPassword)}
            />
            <button
              type="button"
              className={styles["login-button-show"]}
              onClick={() => setIsShow(!isShow)}
            >
              {isShow ? "hide" : "show"}
            </button>
          </div>
        </section>
        <section>
          <label className={styles["login-labels"]}>Verify Password</label>
          <div className={styles["login-inputs-show"]}>
            <input
              className={styles["login-inputs"]}
              placeholder="confirm your password"
              type={isShow ? "text" : "password"}
              label="Verify Password"
              name="passwordConfirmation"
              required
              maxLength={32}
              minLength={8}
              onChange={(e) => inputHandler(e, setConfirm)}
            />
            <button
              type="button"
              className={styles["login-button-show"]}
              onClick={() => setIsShow(!isShow)}
            >
              {isShow ? "hide" : "show"}
            </button>
          </div>
        </section>
        <button type="submit" className={styles["login-button-account"]}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
