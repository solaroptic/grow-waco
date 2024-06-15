import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 2,
      max: 12,
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 30,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 32,
      unique: true,
    },
    industry: String,
    proposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
    votes: {
      type: Array,
      of: {
        type: String,
      },
      default: [],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
