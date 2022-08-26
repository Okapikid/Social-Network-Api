const { User, Thought } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) => (thought) => {
        !thought
          ? res.status(404).json({ message: "Thought does not exist" })
          : res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
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
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      },
      null,
      function (err, docs) {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          res.status(200).json(docs);
        }
      }
    );
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body }, username: req.body.username },
      { runValidators: true, new: true }
    )
      .then((reaction) => {
        !thought
          ? res.status(404).json({ message: "Thought does not exist." })
          : res.json(reaction);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true },
      function (err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json({ message: "Deleted" });
        }
      }
    );
  },
};
