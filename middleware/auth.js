/*
This file contains all logic for verifying a JWT
This exported function will be used as a parameter in
each http request route
*/
const jwt = require("jsonwebtoken");

const config = process.env;

// Function to verify JWT passed into header by client
const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send("A token is required for authentication")
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        console.log(decoded)
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
module.exports = verifyToken;