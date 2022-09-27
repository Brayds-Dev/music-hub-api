/*
This is our main server file which runs the express application
and connects to the mongoDB database using mongoose
*/
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const routes = require('./routes/router');

const app = express();

app.use(express.json());
app.use("/", routes);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const { MONGO_URI } = process.env;

mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false,
        })
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });

app.listen(port, () => {
    console.log(`Server running on port ${port}....`);
});
