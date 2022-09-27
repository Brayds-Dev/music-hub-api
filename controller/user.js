require("dotenv").config();
const User = require('../model/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// register logic
const registerUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const user = await User.create({
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        // return new user
        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
    }
};

// login logic
const logInUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //validate user input
        if(!(email && password)){
            res.status(400).send("All input is required");
        }

        //validate if user exist in our database
        const user = await User.findOne({email});

        if(user && ( await bcrypt.compare(password, user.password))){
            // Create token
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // save user token
            user.token = token;
            //user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = {registerUser, logInUser};