const { connect, connection } = require("mongoose");

connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social_media_database",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = connection;
