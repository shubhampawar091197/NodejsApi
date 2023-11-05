const asyncHandler = require("express-async-handler");
const modelSchema = require("../models/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc get user details
//@route GET /api/
//@access public
const getUsers = asyncHandler(async (req, res) => {
  const getuser = await modelSchema.find();
  res.status(200).json({ getuser });
});

//@desc get user details by id
//@route GET /api/:id
//@access public
const getUsersById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const getuserbyid = await modelSchema.findById({ _id: id });
  if (!getUsersById) {
    res.status(400);
    throw new Error("user not found");
  }
  res.status(200).json({ getuserbyid });
});

//@desc create user details
//@route POST /createUser
//@access public
const createUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phoneno, gender, password } = req.body;
  console.log(`The request body is:${JSON.stringify(req.body)}`);

  if (!firstname) {
    res.status(400);
    throw new Error("firstname field is mandatory");
  } else if (!lastname) {
    res.status(400);
    throw new Error(`lastname field is mandatory`);
  } else if (!email) {
    res.status(400);
    throw new Error(`email field is mandatory`);
  } else if (!phoneno) {
    res.status(400);
    throw new Error(`phone no field is mandatory`);
  } else if (!password) {
    res.status(400);
    throw new Error(`password field is mandatory`);
  }
  //check if user exists
  const userExists = await modelSchema.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);

  //request body
  const user = await modelSchema.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phoneno: req.body.phoneno,
    gender: req.body.gender,
    password: hashedPassword,
  });

  //response body
  if (user) {
    res.status(201).json({
      _id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phoneno: user.phoneno,
      gender: user.gender,
      token: generateToken(user.id),
      message: "user is created",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc update user details with id
//@route PUT /createUser:id
//@access public
const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `updated user for ${req.params.id}` });
});

//@desc update user details with id
//@route PUT /createUser:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `deleted user for ${req.params.id}` });
});

const generateToken = (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

module.exports = { getUsers, getUsersById, createUser, updateUser, deleteUser };
