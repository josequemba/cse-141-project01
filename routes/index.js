const express = require("express");
const router = express.Router();
const usersRoutes = require("./userRoutes");
const swaggerRoute = require("./swagger")

router.use("/", swaggerRoute);

router.get("/", (req, res) => {
    //#swagger.tags=["Hello World"]
  res.send("Hello World");
});

router.use("/users", usersRoutes);

module.exports = router;