const mongodb = require("../database/dataBaseConnection");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["Users"]
  try {
    const result = await mongodb
      .getDb()
      .db("sample_mflix")
      .collection("users")
      .find();
    const users = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching users." });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=["Users"]
  try {
    const userId = new ObjectId(req.params.id);
    const user = await mongodb
      .getDb()
      .db("sample_mflix")
      .collection("users")
      .findOne({ _id: userId });
    if (user) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error fetching single user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user." });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=["Users"]
  try {
    const firstName = req.body.firstName; 
    const lastName = req.body.lastName;  

    if (firstName && lastName) {
      req.body.name = `${firstName.trim()} ${lastName.trim()}`;
    }

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    const result = await mongodb
      .getDb()
      .db("sample_mflix")
      .collection("users")
      .insertOne(user);

    if (result.acknowledged > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(204).json();
    } else {
      res.status(500).json({ message: "Some error occured while creating a new user." });
    }
  } catch (error) {
    console.error("Error Creating a user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating a user." });
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=["Users"]
  try {
    const userId = new ObjectId(req.params.id);
    const firstName = req.body.firstName; 
    const lastName = req.body.lastName;  

    if (firstName && lastName) {
      req.body.name = `${firstName.trim()} ${lastName.trim()}`;
    }

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    const result = await mongodb
      .getDb()
      .db("sample_mflix")
      .collection("users")
      .replaceOne({_id: userId}, user);

    if (result.modifiedCount > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(204).json();
    } else {
      res.status(500).json({ message: "Some error occured while updating the user." });
    }
  } catch (error) {
    console.error("Error updating the user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user." });
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=["Users"]
  try {
    const userId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db("sample_mflix")
      .collection("users")
      .deleteOne({_id: userId});

    if (result.deletedCount > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(204).json();
    } else {
      res.status(500).json({ message: "Some error occured while deleting account." });
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting account." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
