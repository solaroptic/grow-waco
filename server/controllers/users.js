import User from "../models/UserModel.js";
import Proposal from "../models/ProposalModel.js";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, industry } = req.body;
    const user = await User.findById(id);

    if (user) {
      user.userName = userName;
      user.industry = industry;

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { userName, industry },
        { new: true }
      );
      await Proposal.updateOne({ user: id }, { userName });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      await user.deleteOne();

      res.status(200).json({ message: "user deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const userVote = async (req, res) => {
  const { id } = req.params;
  const { votesArray } = req.body;
  try {
    if (!votesArray || votesArray.length > 2) {
      return res.status(400).json({ message: "Invalid votes array" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 1. Decrement totalVotes in existing proposals
    const oldProposalIds = user.votes;

    const oldVotePromises = oldProposalIds.map((id) =>
      Proposal.findByIdAndUpdate(id, { $inc: { totalVotes: -1 } })
    );

    await Promise.all(oldVotePromises);

    // 2. Clear the existing user.votes array
    user.votes = [];

    // 3. Replace with the new_votes array
    user.votes = votesArray.slice();

    // 4. Increment totalVotes in new proposals
    const proposalIds = votesArray;

    const newUpdatePromises = proposalIds.map((id) =>
      Proposal.findByIdAndUpdate(id, { $inc: { totalVotes: +1 } })
    );

    await Promise.all(newUpdatePromises);

    await user.save();

    res.status(200).json({ message: "Vote updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const userLike = async (req, res) => {
  const { id } = req.params;
  const { commentId } = req.body;
  // totalLikes: Number,
  //likes  in user model

  try {
    const user = await User.findById(id);
    const comment = await Comment.findById(commentId);
    if (user && comment) {
      const alreadyLiked = user.likes.includes(commentId);

      if (alreadyLiked) {
        // Unlike logic
        await Comment.findByIdAndUpdate(commentId, {
          $inc: { totalLikes: -1 },
        });
        await User.findByIdAndUpdate(id, { $pull: { likes: commentId } });
        res.status(200).json({ message: "Comment Unliked" });
      } else {
        // Like logic
        await Comment.findByIdAndUpdate(commentId, { $inc: { totalLikes: 1 } });
        await User.findByIdAndUpdate(id, { $push: { likes: commentId } });
        res.status(200).json({ message: "Comment Liked" });
      }
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// should be id of the the proposal creator, not commentor on comment trigger of api, but the id of the user upon user clicking on (own) proposal
export const updateNotifications = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updateResult = await User.findByIdAndUpdate(
      id,
      { $set: { notifications: { $not: user.notifications } } },
      { new: true }
    );
    if (!updateResult) {
      return res
        .status(500)
        .json({ message: "Failed to update notifications" });
    }
    res
      .status(200)
      .json({ message: "Notifications updated", user: updateResult });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// get List of users
// export const getAllUsers = async (req, res) => {
//   const user = req.user;
//   const id = user.id;
//   // why just id.......??????????????????????????????????????
//   try {
//     const users = await User.find({ _id: { $ne: id } });
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };
// search bar to find users/////////////////////////////
// export const searchAllUsers = async (req, res) => {
//   const user = req.user;
//   const id = user.id;
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { userName: { $regex: req.query.search, $options: "i" } }
//         ],
//       }
//     : {};

//   const users = await User.find(keyword).find({ _id: { $ne: id } });
//   res.send(users);
// };

// export const updateUserPicture = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { picturePath } = req.body;
//     const user = await User.findById(id);
//     if (user) {
//       user.picturePath = picturePath;
//       const updatedUser = await User.findByIdAndUpdate(
//         id,
//         { picturePath },
//         { new: true }
//       );
//       res.status(200).json(updatedUser);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
