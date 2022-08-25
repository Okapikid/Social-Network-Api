const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use((req, res) => {
  res.send(
    "Sorry, there doesn't appear to be anything behind this door. Please try again."
  );
});

module.exports = router;
