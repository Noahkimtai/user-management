const express = require("express");
const router = express.Router();
const passport = require("passport");

//importing user controller
const userController = require("../../../controllers/user-controller");

// USER REGISTRATION ROUTE
router.post("/register", userController.registerUser);

// USER LOGIN ROUTE
router.post("/login", userController.createSession);

// UPDATE USER ROUTE - reqiures autentication
router.put("/update-user/:email", userController.updateUser
);

// FETCHING ALL USERS ROUTE
router.get("/get-users", userController.getAllUsers);

// Fectching one user
router.get("/get-user/:email", userController.getUser)

// Delete a user
router.delete('/delete/:email', userController.deleteUserByEmail);

module.exports = router;
