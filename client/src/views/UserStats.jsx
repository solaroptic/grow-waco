import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../utility/userSlice";
import {
  useAddProposalPicMutation,
  useDeleteProposalMutation,
  useGetProposalsQuery,
  useUpdateProposalMutation,
} from "../api/proposalsApiSlice";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../api/userApiSlice";
import toast, { Toaster } from "react-hot-toast";
import styles from "../css/generic.module.css";

//replace About
const UserStats = () => {
  const user = useSelector((state) => state.user.user);
  const [picturePath, setPicturePath] = useState(null);
  const [userName, setUserName] = useState(user?.userName || "");
  const [industry, setIndustry] = useState(user?.industry || "");
  const [isEditing, setisEditing] = useState(false);
  const [isEditingUser, setisEditingUser] = useState(false);
  const [isConfirmingUser, setIsConfirmingUser] = useState(false);
  const [isConfirmingProp, setIsConfirmingProp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentData = [], isLoading, isError } = useGetProposalsQuery();
  const ownProp = currentData.filter(
    (proposal) => proposal?.userName === user?.userName
  )[0];
  const [description, setDescription] = useState(ownProp?.description || "");
  const proposalVotes = currentData
    .filter(
      (proposal) =>
        (proposal._id === user.votes[1] || proposal._id === user.votes[0]) &&
        proposal.title
    )
    .map((proposal) => proposal.title);
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
  //mutations//////////////////////
  const [userNameMutation] = useUpdateUserMutation();
  const [deleteMutation] = useDeleteProposalMutation();
  const [updateMutation] = useUpdateProposalMutation();
  const [mutatePic] = useAddProposalPicMutation();
  const [deleteUserMutation] = useDeleteUserMutation();

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
  const updateProposal = async (event) => {
    event.preventDefault();
    const cloudedImg = await uploadPic();
    const pictureData = cloudedImg?.data.secure_url;
    console.log(pictureData);
    try {
      const id = ownProp._id;
      const update = {
        payload: { description, picturePath: pictureData },
        id: id,
      };
      toast("Proposal updating", toastOptions);
      await updateMutation(update);
      event.target.value = "";
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (err) {
      toast("Error updating", { ...toastOptions, style: { color: "red" } });
    }
  };
  const updateUser = async (event) => {
    event.preventDefault();
    try {
      const id = user._id;
      const update = { updates: { userName, industry }, id: id };
      await userNameMutation(update);
      setisEditingUser(false);
      toast("User updated", toastOptions);
    } catch (err) {
      toast(err, { ...toastOptions, style: { color: "red" } });
    }
  };

  const deleteProposal = () => {
    if (isConfirmingProp) {
      const id = ownProp._id;
      deleteMutation(id);
    } else {
      setIsConfirmingProp(true);
      toast("Delete your proposal???", {
        ...toastOptions,
        style: { color: "red" },
      });
    }
  };

  const deleteUser = () => {
    if (isConfirmingUser) {
      const id = user._id;
      deleteUserMutation(id);
      nav("/");
      dispatch(logoutUser());
    } else {
      setIsConfirmingUser(true);
      toast("Sure you want to delete your account???", {
        ...toastOptions,
        style: { color: "red" },
      });
    }
  };
  return (
    <div className={styles["container-div"]}>
      <div className={styles["text-container-div"]}>
        <Toaster />
        <h2>User Info</h2>
        <div className={styles["stat-container-div"]}>
          <p>{`Name: ${user.userName}`}</p>
          <p>{`Field: ${user.industry}`}</p>
        </div>
        <button
          onClick={() => setisEditingUser(true)}
          className={styles["button"]}
        >
          Edit User
        </button>
        {isEditingUser && (
          <input
            className={styles["stat-textInput"]}
            maxLength={12}
            minLength={4}
            type="text"
            label="username"
            name="username"
            value={userName}
            required
            onChange={(e) => inputHandler(e, setUserName)}
          />
        )}
        {isEditingUser && (
          <input
            className={styles["stat-textInput"]}
            maxLength={16}
            minLength={2}
            type="text"
            label="username"
            name="username"
            value={industry}
            required
            onChange={(e) => inputHandler(e, setIndustry)}
          />
        )}
        {isEditingUser && (
          <button
            onClick={() => setisEditingUser(false)}
            className={styles["button"]}
          >
            Cancel Changes
          </button>
        )}
        {isEditingUser && (
          <button onClick={(e) => updateUser(e)} className={styles["button"]}>
            Save Changes
          </button>
        )}
        {isEditingUser && (
          <button
            onClick={deleteUser}
            className={`${styles["button"]} ${styles["delete-button"]} `}
          >
            DELETE User
          </button>
        )}
        <hr className={styles["stat-green-hr"]} />
        <h2 className={styles["stat-margin"]}>Proposal</h2>
        <div className={styles["stat-container-div"]}>
          {ownProp && <p>{ownProp.title}</p>}
          {ownProp && <p>{`Votes For: ${ownProp.totalVotes}`}</p>}
          {!ownProp && <p>No proposals made</p>}
        </div>
        <button onClick={() => setisEditing(true)} className={styles["button"]}>
          Edit proposal
        </button>
        {isEditing && (
          <textarea
            className={styles["stat-text-input"]}
            placeholder={ownProp.description}
            value={description}
            maxLength={150}
            minLength={15}
            type="text"
            label="details"
            name="details"
            required
            rows={5}
            onChange={(e) => inputHandler(e, setDescription)}
          />
        )}
        {isEditing && (
          <input
            // className={styles["file-input"]}
            placeholder="Optional: add an image"
            label="image"
            type="file"
            accept="image/*"
            name="image"
            onChange={(e) => setPicturePath(e.target.files[0])}
          />
        )}
        {isEditing && (
          <button
            onClick={() => setisEditing(false)}
            className={styles["button"]}
          >
            Cancel Changes
          </button>
        )}
        {isEditing && (
          <button
            onClick={(e) => updateProposal(e)}
            className={styles["button"]}
          >
            Save Changes
          </button>
        )}
        {isEditing && (
          <button
            onClick={deleteProposal}
            className={`${styles["button"]} ${styles["delete-button"]} `}
          >
            Delete Proposal
          </button>
        )}
        <hr className={styles["stat-green-hr"]} />
        {user?.votes?.length > 1 && (
          <h2 className={styles["stat-margin"]}>Your Vote Pair</h2>
        )}
        <div className={styles["stat-container-div"]}>
          {user?.votes?.length > 1 &&
            proposalVotes?.map((vote) => <p key={vote}>{vote}</p>)}
          {user.votes.length < 1 && <p>Vote Today!</p>}
        </div>
      </div>
    </div>
  );
};

export default UserStats;
