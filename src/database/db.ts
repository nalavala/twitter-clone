import mongoose from "mongoose";
import chalk from "chalk";
import config from "./../property";
import logger from './../core/logger'

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;



const dbURL = config.db;
mongoose
    .connect(dbURL)
    .then(() => {
        logger.info('Mongoose connection done');
    })
    .catch((e) => {
        logger.error('Mongoose connection error');
        logger.error(e);
    });

mongoose.connection.on("connected", function () {
    logger.info(connected("Mongoose default connection is open to ", dbURL));
});

mongoose.connection.on("error", function (err) {
    logger.info(
        error("Mongoose default connection has occured " + err + " error")
    );
});

mongoose.connection.on("disconnected", function () {
    logger.info(disconnected("Mongoose default connection is disconnected"));
});

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        logger.info(
            termination(
                "Mongoose default connection is disconnected due to application termination"
            )
        );
        process.exit(0);
    });
});

