const { User, Thought } = require("../models");
// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

// GET ONE USER WITH ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    res.status(404).json({ message: `No user found with id: ${id}!` });
    return;
  }
  res.json(user);
};

// CREATE USER
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.json(400).json(error);
  }
};

// UPDATE USER WITH ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    res.status(404).json({ message: `No user found with id: ${id}!` });
  }
  res.json(user);
};

// DELETE USER
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    res.status(404).json({ message: `No user found with id ${id}!` });
  }
  res.json({ message: "User has been deleted." });
};

// ADD FRIEND
const addFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { freinds: friendId } },
    { runValidators: true }
  );
  res.json(user);
};

// REMOVE FRIEND
const removeFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { friends: friendId } }
  );
  if (!user) {
    res.status(404).json({ message: `No user found with id ${userId}!` });
  }
  res.json(user);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
