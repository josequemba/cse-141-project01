const mongodb = require("../database/index");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  console.log("eliudall")
  try {
    const result = await mongodb.getDatabase().db().collection("mycollection").find();
    const users = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "An error occurred while fetching users." });
  }
};

const getSingle = async (req, res) => {
  console.log("eliud")
  try {
    const userId = new ObjectId(req.params.id);
    const user = await mongodb.getDatabase().db().collection("mycollection").findOne({ _id: userId });
    if (user) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error fetching single user:", error);
    res.status(500).json({ message: "An error occurred while fetching the user." });
  }
};

module.exports = {
  getAll,
  getSingle
};