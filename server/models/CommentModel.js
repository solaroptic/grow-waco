import mongoose from "mongoose";

const CommentModelSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    onProposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentModelSchema);
export default Comment;
