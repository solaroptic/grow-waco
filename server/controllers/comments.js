import Comment from "../models/CommentModel.js";
import Proposal from "../models/ProposalModel.js";
import User from "../models/UserModel.js";

export const allComments = async (req, res) => {
  const { id } = req.params;
  // const proposal = await Proposal.findById(id);
  try {
    const comments = await Comment.find({ onProposal: id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addComment = async (req, res) => {
  const { sender, name, content, onProposal } = req.body;
  if (!sender || !onProposal || !content || !name) {
    return res.sendStatus(400);
  }

  try {
    const proposal = await Proposal.findById(onProposal);
    let updatedComment;

    const existingComment = proposal.comments.find(
      (comment) => comment?.sender?.toString() === sender
    );

    if (existingComment) {
      await Comment.findByIdAndUpdate(
        existingComment._id,
        { content },
        { new: true }
      );
      updatedComment = existingComment;
    } else {
      const newComment = new Comment({ sender, name, content, onProposal });
      updatedComment = await newComment.save();

      await Proposal.findByIdAndUpdate(
        onProposal,
        { $push: { comments: newComment._id }, notification: true },
        { new: true }
      );
    }

    res.status(201).json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
      return res
        .status(400)
        .json({ message: "Missing content in request body" });
    }
    const comment = await Comment.findById(id);

    if (comment) {
      comment.content = content;
      const updatedComment = await comment.save();
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (comment) {
      await comment.deleteOne();

      res.status(200).json({ message: "Comment deleted" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateLikes = async (req, res) => {
  const { userId, commentId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user already liked the comment (comment ID exists in user's likes)
    const alreadyLiked = user.likes.includes(commentId);

    if (!alreadyLiked) {
      user.likes.push(commentId);
      comment.totalLikes++;
    } else {
      const commentIndex = user.likes.indexOf(commentId);
      user.likes.splice(commentIndex, 1);
      comment.totalLikes--;
    }

    await Promise.all([user.save(), comment.save()]);

    return res.json({
      message: alreadyLiked ? "Unliked comment" : "Liked comment",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
