import express from "express";
import {
  allProposals,
  addProposal,
  updateProposal,
  deleteProposal,
  markNotificationRead,
} from "../controllers/proposals.js";
// import { getUser, updateUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Get */
router.get("/", allProposals);
/* Post */
router.post("/add", verifyToken, addProposal);
/* Patch */
router.patch("/update/:id", verifyToken, updateProposal);
/* Patch */
router.patch("/notification/:id", markNotificationRead);
/* Delete */
router.delete("/:id", verifyToken, deleteProposal);

export default router;
