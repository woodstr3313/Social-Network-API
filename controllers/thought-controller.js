const req = require("express/lib/request");
const res = require("express/lib/response");
const { Thought } = require("../models/Thought");
const User = require("../models/User");

// GET ALL THOUGHTS
const getAllThoughts = async (req, res) => {
  const allthoughts = await Thought.find({});
  res.json({ allthoughts });
};

// GET SINGLE THOUGHT BY ITS ID
const getThoughtById = async (req, res) => {
  const { thoughtId } = req.params;
  const thought = await Thought.findOne({ _id: thoughtId });
  if (!thought) {
    res.status(400).json({ message: "Bad Id! No thought can be found!" });
    return;
  }
  res.json({ thought });
};

// CREATE THOUGHT
const addThought = async (req, res) => {
  const { userId } = req.params;
  const thought = await Thought.create({ ...req.body });
  const user = await Uster.findOneAndUpdate(
    { _id: userId },
    { $push: { thoughts: thought._id } },
    { new: true }
  );
  // DELETE CREATED THOUGHTS WITH NO ASSOCIATED USER
  if (!user) {
    await Thought.findByIdAndDelete({ _id: thought._id });
    res.status(400).json({ message: "No associated user with this id!" });
    return;
  }
  res.json(user);
};

// UPDATE THOUGHT WITH ID
const updateThought = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!thought) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json({ thought });
  } catch (error) {
    console.log(error);
  }
};

// REMOVE THOUGHT BY ID
const removeThought = async (req, res) => {
  const { thoughtId, userId } = req.params;
  try {
    const thought = await Thought.findOneAndDelete({ _id: thoughtId });
    if (!thought) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { thoughts: thoughtId } },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

// ADD REACTION
const addReaction = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(
      { _id: thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!thought) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json(thought);
  } catch (error) {
    console.log(error);
  }
};

// REMOVE REACTION
const removeReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { reactionId: reactionId } } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json(thought);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
};
