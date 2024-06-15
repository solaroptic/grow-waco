import React, { useState } from "react";
import { useLoginUserMutation } from "../api/userApiSlice";
import { loadUser } from "../utility/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import styles from "../css/generic.module.css";

const SignIn = () => {
  const [isShow, setIsShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [mutate] = useLoginUserMutation();
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
    try {
      // returns a double nested obj (obj>>data>>user/token)
      const { data } = await mutate({ email, password });
      if (data.user && data.token) {
        const { user, token } = data;
        await dispatch(loadUser({ user, token }));
        navigate("/", { replace: true });
      } else {
        toast(data.message, toastOptions);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 3000);
      }
    } catch (error) {
      toast.error("Invalid email or password", {
        ...toastOptions,
        style: { color: "red" },
        icon: "❌",
      });
    }
  };
  return (
    <div className={styles["signin-container-div"]}>
      <Toaster />
      <form onSubmit={(e) => handleSubmit(e)} className={styles["login-form"]}>
        <label
          className={styles["login-labels"]}
          style={{
            marginBottom: "9px",
          }}
        >
          Email
        </label>
        <input
          className={styles["login-inputs"]}
          placeholder="JohnDoe@gmail.com"
          type="email"
          label="UserName"
          name="email"
          required
          onChange={(e) => inputHandler(e, setEmail)}
        />
        <label className={styles["login-labels"]}>Password</label>
        <div className={styles["login-inputs-show"]}>
          <input
            className={styles["login-inputs"]}
            placeholder="enter your password"
            label="Password"
            type={isShow ? "text" : "password"}
            name="password"
            onChange={(e) => inputHandler(e, setPassword)}
          />
          <button
            className={styles["login-button-show"]}
            onClick={() => setIsShow(!isShow)}
          >
            {isShow ? "hide" : "show"}
          </button>
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          className={styles["login-button-account"]}
        >
          Login
        </button>
      </form>
      {user && <p>{user.userName}</p>}
    </div>
  );
};

export default SignIn;
