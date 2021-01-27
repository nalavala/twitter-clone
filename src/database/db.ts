import mongoose from "mongoose";
import chalk from "chalk";
import config from "./../property";

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;



const dbURL = "mongodb://localhost:27017/twitter";
mongoose
    .connect(dbURL)
    .then(() => {
        console.log('Mongoose connection done');
    })
    .catch((e) => {
        console.error('Mongoose connection error');
        console.error(e);
    });

mongoose.connection.on("connected", function () {
    console.log(connected("Mongoose default connection is open to ", dbURL));
});

mongoose.connection.on("error", function (err) {
    console.log(
        error("Mongoose default connection has occured " + err + " error")
    );
});

mongoose.connection.on("disconnected", function () {
    console.log(disconnected("Mongoose default connection is disconnected"));
});

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log(
            termination(
                "Mongoose default connection is disconnected due to application termination"
            )
        );
        process.exit(0);
    });
});

