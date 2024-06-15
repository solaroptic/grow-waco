import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EmailVerify = () => {
  const [isVerified, setIsVerified] = useState(false);
  const param = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/auth/${param.id}/verify/${param.token}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.message === "Email verified") {
          setIsVerified(true);
        }
      } catch (error) {
        console.error(error);
        setIsVerified(false);
      }
    };
    // ///////////////////////////////
    // Uncomment the line below to verify
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
