const UserModel = require("../models/UserModel");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, msg: "Something went wrong!" });
  }
};

module.exports.createUser = (req, res) => {
  const { name, password, items } = req.body;

  const user = new UserModel({ name, password, items });

  user
    .save()
    .then((data) => {
      console.log("User created Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, password, items } = req.body;

  UserModel.findByIdAndUpdate(id, { name, password, items })
    .then(() => res.send("User updated successfully"))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;

  UserModel.findByIdAndDelete(id)
    .then(() => res.send("User deleted successfully"))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};
