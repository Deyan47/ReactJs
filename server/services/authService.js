const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET, SALT_ROUNDS } = require("../config/config");

const pattern = /^[a-zA-Z0-9]+$/;

module.exports = {
  register: async ({ username, password, repeatPassword }) => {
    if (password !== repeatPassword)
      throw { message: "Passwords should match." };

    if (password.length < 6)
      throw { message: "Password should be at least 6 characters long." };

    if (username.length < 6)
      throw {
        message:
          "Username should be at least 4 characters long and should contains only english letters and digits",
      };

    if (!pattern.test(username))
      throw {
        message:
          "Username should be at least 4 characters long and should contain only english letters and digits",
      };

    let isAlreadyExists = await User.findOne({ username });

    if (isAlreadyExists) throw { message: "User already exists!" };

    let hash = await bcrypt.hash(password, SALT_ROUNDS);

    let user = await new User({ username, password: hash }).save();

    return jwt.sign({ _id: user._id, username: user.username }, SECRET);
  },
  login: async ({ username, password }) => {
    let user = await User.findOne({ username });

    if (!user) throw { message: "Wrong username or password." };

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw { message: "Wrong username or password." };

    return jwt.sign({ _id: user._id, username: user.username }, SECRET);
  },
};
