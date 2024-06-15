import express from "express";
import {
  // getUser,
  updateNotifications,
  updateUser,
  deleteUser,
  userVote,
  userLike,
  // updateUserPicture,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* UPDATE user */
router.patch("/:id", verifyToken, updateUser);
/* VOTE by user */
router.patch("/vote/:id", verifyToken, userVote);
/* LIKE by user */
router.patch("/like/:id", userLike);
/* UPDATE notifications */
router.patch("/notify/:id", verifyToken, updateNotifications);
/* DELETE user */
router.delete("/:id", verifyToken, deleteUser);

//  READ Later
// router.get("/:id", verifyToken, getUser);

/* UPDATE Later */
// router.patch("/avatar/:id", verifyToken, updateUserPicture);

export default router;
