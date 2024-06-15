import React, { useEffect, useRef, useState } from "react";
import styles from "../css/modal.module.css";
import CommentBox from "./CommentBox";
import LeaveComment from "./LeaveComment";
import proposalImage from "../assets/proposalIcon.avif";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateVotesMutation } from "../api/userApiSlice";
import { useNotifyProposalClearMutation } from "../api/proposalsApiSlice";
import { addVote, removeVote, resetVoteArray } from "../utility/userSlice";
import { proposalsApiSlice } from "../api/proposalsApiSlice.js";

const Modal = ({ rowData, setHasNotifications }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [mutateVote] = useUpdateVotesMutation();
  const [mutateNotify] = useNotifyProposalClearMutation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const currentVoteArray = useSelector((state) => state?.user?.userVoteArray);
  const userId = user?._id;
  const leaveCommentRef = useRef(null);
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

  const openLeaveComment = () => {
    if (!user) {
      toast("Log in to comment", toastOptions);
    }
    setIsCommenting((prev) => {
      return true;
    });
  };

  useEffect(() => {
    if (rowData.user === userId && rowData.notification === true) {
      setHasNotifications(false);
      mutateNotify(rowData._id);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (currentVoteArray.length === 1) {
      toast("Vote added, one more to submit", toastOptions);
      return;
    }
    if (currentVoteArray.length === 2) {
      const payload = {
        userId,
        votesArray: currentVoteArray,
      };
      toast("Submitting your votes", toastOptions);
      mutateVote(payload);
      dispatch(resetVoteArray());
      // dispatch(proposalsApiSlice.util.invalidateTags(["Proposals", "userApi"]));
    }
  }, [isChecked]);

  const voteAction = (e, proposalId) => {
    setIsChecked(e.target.checked);
    if (!user) {
      toast("Log in to vote", toastOptions);
      return;
    }
    if (e.target.checked && currentVoteArray[0] !== proposalId) {
      dispatch(addVote(proposalId));
      // toast("Vote added", toastOptions);
    }
    if (e.target.checked === false) {
      dispatch(removeVote(proposalId));
      // toast("Vote removed", toastOptions);
    }
  };
  return (
    <div className={styles["modal-container-div"]}>
      <Toaster />
      <h2>{rowData.title} </h2>
      <div className={styles["name-vote-div"]}>
        <p className={styles["name-span"]}>{rowData.userName}</p>
        <div className={styles["checkbox-wrapper-div"]}>
          <label className={styles["checkbox-container-label"]}>
            <input
              defaultChecked={false}
              type="checkbox"
              onClick={(e) => voteAction(e, rowData._id)}
            />
            <div className={styles["checkbox-checkmark"]}></div>
            <span
              className={`${styles["checkbox-vote"]} ${
                isChecked
                  ? styles["checkbox-voted"]
                  : styles["checkbox-vote-not"]
              }`}
            >
              Vote
            </span>
          </label>
        </div>
      </div>

      <div>
        <div>
          <h3 className={styles["details-h3"]}>
            <img className={styles["proposal-icon"]} src={proposalImage} />
          </h3>
          <p className={styles["proposal-description"]}>
            {rowData.description}
          </p>
        </div>
        <div>
          {rowData.picturePath && (
            <div className={styles["proposal-visuals-div"]}>
              <h3>Visuals</h3>
              <img
                className={styles["proposal-image"]}
                src={rowData.picturePath}
              />
            </div>
          )}
        </div>
        <p className={styles["date-p"]}>{rowData.formattedDate}</p>
        <hr />
        {!isCommenting && (
          <p
            ref={leaveCommentRef}
            className={styles["leaveComment-p"]}
            onClick={openLeaveComment}
          >
            Leave a comment
          </p>
        )}
        {isCommenting && <LeaveComment rowDataId={rowData._id} />}
      </div>
      <CommentBox proposalId={rowData._id} />
    </div>
  );
};

export default Modal;
