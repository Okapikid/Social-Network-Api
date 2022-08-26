const Thought = require("../models/thought");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: "thought", select: "-__v" })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought does not exist" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.deleteOne({ _id: req.params.thoughtId })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body)
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought does not exist" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "Thought does not exist" })
          : res.json(reaction);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought does not exist" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
