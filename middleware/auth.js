const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const modelSchema = require("../models/model");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization("Bearer")) {
    try {
      //get the token from header
      token = req.headers.authorization.split(" ")[1];

      //verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from the token
      req.user = await modelSchema.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token found");
  }
});

module.exports = { protect };
