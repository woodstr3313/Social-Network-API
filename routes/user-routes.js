const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../controllers/user-controller");

// API USERS ID DELETEUSER
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// API USERS USERID FRIENDS FRIENDS ID REMOVEFRIEND
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// API USERS CREATEUSER
router.route("/").get(getAllUsers).post(createUser);

module.exports = router;
