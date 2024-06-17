import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
      unique: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
export const Token = mongoose.model("Token", TokenSchema);
// export default Token;
