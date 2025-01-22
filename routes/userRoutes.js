const express = require("express");
const router = express.Router();
const validation = require("../utilities/accountValidator")

const userController = require("../controllers/userController");

router.get("/", userController.getAll);

router.get("/:id", userController.getSingle);

router.post("/", validation.saveUserRules(), validation.checkData, userController.createUser);

router.put("/:id", validation.saveUserRules(), validation.checkData, userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;