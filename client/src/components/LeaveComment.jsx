import React, { useState } from "react";
import styles from "../css/comment.module.css";
import { useSelector } from "react-redux";
import { useAddCommentMutation } from "../api/commentsApiSlice";
import toast, { Toaster } from "react-hot-toast";

const LeaveComment = ({ ref, rowDataId }) => {
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user.user);
  const [mutate] = useAddCommentMutation();
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

  const handleClickLeaveComment = (e) => {
    e.stopPropagation();
  };

  const handleSendComment = () => {
    //if payload not separated, it will get "Uncaught (in promise) Error: Actions must be plain objects.
    if (!user) {
      toast("Log in to comment", toastOptions);
      return;
    }
    try {
      const payload = {
        content: comment,
        sender: user._id,
        name: user.userName,
        onProposal: rowDataId,
      };
      if (comment) {
        mutate(payload);
        setComment("");
      }
    } catch (error) {
      toast("Error sending comment", {
        ...toastOptions,
        style: { color: "red" },
      });
    }
  };
  return (
    <div
      ref={ref}
      onClick={(e) => handleClickLeaveComment(e)}
      className={styles["leaveComment-container-div"]}
    >
      <Toaster />
      <input
        autoFocus
        required
        placeholder="Comment..."
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        className={styles["leaveComment-input"]}
      />
      <section className={styles["leaveComment-section"]}>
        <span
          className={styles["leaveComment-button"]}
          onClick={handleSendComment}
        >
          Send
        </span>
      </section>
    </div>
  );
};

export default LeaveComment;
