//importing user
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const encryption = require('../config/encryption');


// USER REGISTRATION - accepts Name, Email, Phone, Password and confirm password.
module.exports.registerUser = async (req, res) => {
  
  try{

    //validate if password and confirm password matches
    if(req.body.password != req.body.confirm_password){
      return res.status(401).json({
        message: 'Passwords do not match. Please try again'
      });
    }

    //if passwords match - check if the user is already registered
    let user = await User.findOne({email:req.body.email});

    //if user does not exist - create the user else redirect back to register page
    if(!user){

      //encryping the user details before storing it in DB
      const encryptedUser = {
        name: encryption.encryptData(req.body.name),
        email: req.body.email,
        phone: encryption.encryptData(req.body.phone),
        password: await bcrypt.hash(req.body.password, Number(process.env.BCR_SALT)),
      }
  
      await User.create(encryptedUser);
      return res.status(200).json({
        message: 'User registered successfully'
      });
    }else{
      //if user exists
      return res.status(422).json({
        message: 'Email already exists.'
      });
    }

  }catch(err){
    if(err){
      return res.status(500).json({
        message: 'Internal Server Error. Please try again!!'
      })
    }
  }
  
}



// USER LOGIN - accepts user email and password - upon login will generate a json web token valid for 5 mins
module.exports.createSession = async (req, res) => {
  try{

    //find user using email - if user exists
    let user = await User.findOne({ email: req.body.email});
    
    //if user doesnot exists
    if(!user){
      return res.status(422).json({
        message:'User does not exists'
      })
    }

    //check if password is valid - compare using bcrypt compare method
    if(await bcrypt.compare(req.body.password, user.password)){
      return res.status(200).json({
        message:'Sign in successfull',
        data:{
          token: jwt.sign(user.toJSON(), process.env.JWT_SECRET, {expiresIn: '500000'})
        }
      });

    //return if invalid purpose
    }else{
      return res.status(422).json({
        message:'Incorrect username / password'
      })
    }

  }catch(err){
    console.log(err.message);
    return res.status(500).json({
      message:'Internal server error'
    });
  }
}


// UPDATE USER - accepts user name and user phone no and updates them.
module.exports.updateUser = async (req, res) => {

    try{
      const email = req.params.email;
      let user = await User.findOne({email: email});
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.name = encryption.encryptData(req.body.name);
      user.phone = encryption.encryptData(req.body.phone);

      user.save();

      var decryptedUser = {
        name: encryption.decryptData(user.name),
        email: user.email,
        phone: encryption.decryptData(user.phone)
      };

      return res.status(200).json({
        message: 'User details updated successfully',
        user:decryptedUser
      })


    }catch(err){
      console.log('Error:', err.message);
      return res.status(500).json({
        message: 'Internal Server Error'
      })
    }
}



// FETCH ALL USER 
module.exports.getAllUsers = async (req, res) => {
  try{
    //find all users present in DB and decrypt it
    let users = await User.find({});
    var decryptedUser = [];
    for(i in users){
      const user = {
        name: encryption.decryptData(users[i].name),
        email: users[i].email,
        phone: encryption.decryptData(users[i].phone)
      }

      decryptedUser.push(user);
    }
    
    return res.status(200).json({
      message:'All registered users',
      users: decryptedUser
    });

  }catch(err){
    if(err){
      console.log(err.message);
      return res.status(500).json({
        message: `OOPs some error occurred - ${err.message}`
      });
    }
  }
  
}

// FETCH A USER 
module.exports.getUser = async (req, res) => {
  try {
    const email = req.params.email;
    const userMatch = await User.findOne({ email });

    if (!userMatch) {
      return res.status(404).json({ message: "User not found" });
    }

    const decryptedUser = {
      name: encryption.decryptData(userMatch.name),
      email: userMatch.email,
      phone: encryption.decryptData(userMatch.phone),
    };

    return res.status(200).json({
      message: "User found",
      user: decryptedUser,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: `Oops! Some error occurred - ${err.message}`,
    });
  }
};

// delete a user
module.exports.deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: `Error deleting user: ${err.message}` });
  }
};