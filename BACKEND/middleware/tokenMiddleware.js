const jwt = require("jsonwebtoken");
const sectet_key = "harishkumar";

const tokenMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  console.log(process.env.JWT_SECRET);
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    console.log("de==", decoded);
    req.userId = decoded.userId;
    console.log(req.userId);
    next();
  });
};

module.exports = tokenMiddleware;
