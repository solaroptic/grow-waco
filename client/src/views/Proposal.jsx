import React, { useEffect, useMemo, useState } from "react";
import styles from "../css/proposal.module.css";
import {
  useAddProposalMutation,
  useAddProposalPicMutation,
} from "../api/proposalsApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Proposal = () => {
  const [proposalUserName, setProposalUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [picturePath, setPicturePath] = useState("");
  const [mutate] = useAddProposalMutation();
  const [mutatePic] = useAddProposalPicMutation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (user) {
      setProposalUserName(user.userName);
      setUserId(user._id);
    }
  }, [user]);

  const inputHandler = (event, setter) => {
    setter(event.target.value);
  };

  const uploadPic = async () => {
    try {
      if (picturePath === undefined || picturePath === null) {
        return;
      }
      if (
        picturePath.type === "image/jpeg" ||
        picturePath.type === "image/png" ||
        picturePath.type === "image/jpg"
      ) {
        const data = new FormData();
        data.append("file", picturePath);
        data.append("upload_preset", "fabiz_site");
        data.append("cloud_name", "duysbh0j0");
        const imgObj = await mutatePic(data);
        return imgObj;
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };
  //////////////////////////////
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const cloudedImg = await uploadPic();
    const pictureData = cloudedImg?.data.secure_url;
    try {
      const payload = {
        userId: userId,
        userName: proposalUserName,
        title: title,
        description: description,
        picturePath: pictureData,
      };
      const data = await mutate(payload);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles["proposal-container"]}>
      <form onSubmit={handleFormSubmit} className={styles["proposal-form"]}>
        <h2 className={styles["proposal-h2"]}>Propose a Seed</h2>
        <label className={styles["proposal-labels"]}>Title</label>
        <input
          className={styles["proposal-inputs"]}
          placeholder="Name your idea"
          maxLength={18}
          minLength={3}
          type="text"
          label="title"
          name="title"
          required
          autoFocus
          onChange={(e) => inputHandler(e, setTitle)}
        />
        <label className={styles["proposal-labels"]}>Details</label>
        <textarea
          className={styles["proposal-textInput"]}
          placeholder="Provide details of you plan or how it differs from others. Benefits/Constraints/Considerations"
          maxLength={150}
          minLength={15}
          type="text"
          label="details"
          name="details"
          required
          rows={5}
          onChange={(e) => inputHandler(e, setDescription)}
        />
        <label className={styles["proposal-labels"]}>Visualization File</label>
        <input
          className={styles["file-input"]}
          placeholder="Optional: add an image"
          label="image"
          type="file"
          accept="image/*"
          name="image"
          onChange={(e) => setPicturePath(e.target.files[0])}
        />

        <button type="submit" className={styles["propose-button"]}>
          Plant
        </button>
      </form>
    </div>
  );
};

export default Proposal;
