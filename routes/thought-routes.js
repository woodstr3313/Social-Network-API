const router = require("express").Router();
const {
  getAllThoughts,
  addThought,
  getThoughtById,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../controllers/thought-controller");
const { route } = require("./user-routes");

// API THOUGHTS GET
router.route("/").get(getAllThoughts);

// API THOUGHTS USER ID ADD
router.route("/:userId").post(addThought);

// API THOUGHTS USER ID THOUGHT ID UPDATE
router.route("/:thoughtId").get(getThoughtById).put(updateThought);

// API THOUGHTS USER ID THOUGHT ID REMOVE
router.route("/:userId/:thoughtId").delete(removeThought);

// API THOUGHTS THOUGHTID REACTION ADD REACTION
router.route("/:thoughtId/reactions").post(addReaction);

// API THOUGHTID REACTIONS REACTIONID
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
