const Users = require("../models/user");
const validator = require("validator");

const jwt = require("jsonwebtoken");

// jwt screte creat tokem
const createToken = (userId) => {
  console.log(userId);
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //   console.log(name, email, password);
    const emailExist = await Users.findOne({ email });
    if (emailExist) {
      return res.json({ success: false, message: "User already Exist" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const data = new Users({
      name: name,
      email: email,
      password: password,
    });

    const savedData = await data.save();
    // console.log(savedData);
    const token = createToken(savedData._id);
    res.json({
      success: true,
      message: "Signup Successfull",
      data: savedData,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //   console.log(email, password);
    const userData = await Users.findOne({ email });
    if (!userData) {
      return res.json({
        success: false,
        message: "User does not exist please signup first",
      });
    }
    // const isValidPassword = await bcrypt.compare(password, userData.password);
    // const isValidPassword = await bcrypt.compare(password, userData.password);
    const isValidPassword = password === userData.password;
    if (!isValidPassword) {
      return res.json({ success: false, message: "Invalid password!" });
    } else {
      const token = createToken(userData._id);
      res.json({
        success: true,
        message: "Login Successful",
        token,
        data: {
          id: userData._id,
          email: userData.email,
          password: userData.password,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signup, login };
