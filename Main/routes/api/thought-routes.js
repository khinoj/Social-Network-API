// import express router
const router = require('express').Router();
// import thought controller functions
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

//  url  /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// url /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// url /api/thoughts/:thoughtId/reactions/
router.route('/:thoughtId/reactions/').post(addReaction);

// url /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;