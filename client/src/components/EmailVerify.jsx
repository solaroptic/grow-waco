import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EmailVerify = () => {
  const [isVerified, setIsVerified] = useState(false);
  const param = useParams();
  console.log(param);
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `https://grow-waco.onrender.com/auth/${param.id}/verify/${param.token}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.message === "Email verified") {
          setIsVerified(true);
        }
      } catch (error) {
        console.error(error);
        setIsVerified(false);
      }
    };
    verifyEmail();
  }, [param]);

  return (
    <>
      <h1>Hello!</h1>
      {isVerified ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>Thank you for verifying your email!</h1>
          <p>You are now able to log in and use the application.</p>
          <Link className="center" to="/login">
            <button
              style={{
                margin: "4rem 0",
              }}
            >
              Login
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <h1>Verify your email</h1>
          <p>
            We have sent you an email with a verification link. Please click on
            the link to verify your email.
          </p>
        </div>
      )}
    </>
  );
};

export default EmailVerify;
