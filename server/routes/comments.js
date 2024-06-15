import express from "express";
import {
  allComments,
  addComment,
  updateComment,
  deleteComment,
  updateLikes,
} from "../controllers/comments.js";
// import { getUser, updateUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Get */
router.get("/:id", allComments);
/* Post */
router.post("/", verifyToken, addComment);
/* Patch */
router.patch("/like", updateLikes);
/* Patch */
router.patch("/:id", verifyToken, updateComment);
/* Delete */
router.delete("/:id", verifyToken, deleteComment);

export default router;
