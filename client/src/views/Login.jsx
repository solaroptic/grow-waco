import React, { useState } from "react";
import Register from "../components/Register";
import SignIn from "../components/SignIn";

import styles from "../css/generic.module.css";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className={styles["container-div"]}>
      <div className={styles["login-container-div"]}>
        {!isRegister && <h2>Welcome</h2>}
        {!isRegister && (
          <aside onClick={() => setIsRegister(!isRegister)}>
            New? Sign Up Here!
          </aside>
        )}
        {!isRegister && <SignIn />}
        {isRegister && (
          <Register isRegister={isRegister} setIsRegister={setIsRegister} />
        )}
      </div>
    </div>
  );
};

export default Login;
