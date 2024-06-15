import Proposal from "../models/ProposalModel.js";
import User from "../models/UserModel.js";

export const allProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({});
    res.status(200).json(proposals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addProposal = async (req, res) => {
  const { userId, userName, title, description, picturePath } = req.body;
  if (!userId || !title || !description) {
    return res.sendStatus(400);
  }

  const newProposal = new Proposal({
    user: userId,
    userName: userName,
    title: title,
    description: description,
    picturePath: picturePath,
  });

  try {
    const user = await User.findById(userId);

    let updatedProposal;

    if (user && user.proposal) {
      //delete comments associated with proposal
      await Comment.deleteMany({ onProposal: user.proposal });
      //delete proposal
      await Proposal.findByIdAndDelete(user.proposal);
    }

    updatedProposal = await newProposal.save();
    // the reason we use save() instead of create() is because we need the _id of the new proposal

    await User.findByIdAndUpdate(
      userId,
      { proposal: updatedProposal._id },
      { new: true }
    );

    res.status(201).json(updatedProposal);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updateProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, picturePath } = req.body;
    const proposal = await Proposal.findById(id);

    if (proposal) {
      proposal.description = description;
      proposal.picturePath = picturePath;

      const updatedProposal = await proposal.save();
      res.status(200).json(updatedProposal);
    } else {
      res.status(404).json({ message: "Proposal not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deleteProposal = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the proposal
    const proposal = await Proposal.findByIdAndDelete(id);

    if (proposal) {
      //delete all comments associated with proposal
      if (proposal.comments && proposal.comments.length > 0) {
        await Comment.deleteMany({
          _id: { $in: proposal.comments.map((comment) => comment._id) },
        });
      }
      // Find the user who owns proposal
      const user = await User.findOneAndUpdate(
        { proposal: proposal._id }, // user w "proposal" field matching deleted ID
        { $unset: { proposal: "" } }, // Remove the "proposal" field from the user
        { new: true } // Return the updated user document
      );

      if (user) {
        // proposal deleted / user reference removed
        res.status(200).json({ message: "Proposal deleted" });
      } else {
        // User not found
        res.status(400).json({ message: "User not found" });
      }
    } else {
      // Proposal not found
      res.status(404).json({ message: "Proposal not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markNotificationRead = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProposal = await Proposal.findByIdAndUpdate(
      id,
      { notification: false }, // Set notification to false
      { new: true } // Return the updated document
    );

    if (!updatedProposal) {
      res.status(404).send("Proposal not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error marking notification read");
  }
};
