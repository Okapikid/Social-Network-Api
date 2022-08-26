const User = require("../models/user");
const Thought = require("../models/thought");

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) => {
        !user
          ? res.status(400).json({ message: "User does not exist" })
          : res.json(user);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.deleteOne({ _id: req.params.userId })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        username: req.body.username,
        email: req.body.email,
      },
      null,
      function (err, docs) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(docs);
        }
      }
    );
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body }, username: req.body.username },
      { runValidators: true, new: true },
      function (err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json({ message: "Friend added" });
        }
      }
    );
  },
  deleteFriend(req, res) {
    User.findOneAndDelete(
      { _id: req.params.thoughtId },
      { $pull: { friends: req.body } },
      { new: true },
      function (err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json({ message: "Friend deleted" });
        }
      }
    );
  },
};
