const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: () => Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJson: {
      virtuals: true,
    },
    id: false,
  }
);

// RETRIEVES THE LENGTH OF THE THOUGHT'S REACTIONS ARRAY
thoughtSchema.virtual("reactionCount").get(function () {
  return `${this.reactions.length}`;
});

const Thought = model("thought", thoughtSchema);

// EXPORT THOUGHT MODEL
module.exports = Thought;
