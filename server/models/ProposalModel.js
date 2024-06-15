// sender, reference, content
import mongoose from "mongoose";

const ProposalModelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    picturePath: {
      type: String,
      default: "",
    },
    formattedDate: {
      type: String,
    },
    totalVotes: {
      type: Number,
      default: 0,
    },
    isReviewed: Boolean,
    comments: {
      type: Array,
      of: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
      default: [],
    },
    notification: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

ProposalModelSchema.pre("save", async function (next) {
  if (this.isNew && this.createdAt) {
    this.formattedDate = this.createdAt.toISOString().slice(0, 10);
  }
  next();
});

const Proposal = mongoose.model("Proposal", ProposalModelSchema);
export default Proposal;
