import bunyan from "bunyan";
const serviceName = process.env.APP_NAME || "twitter-clone-app";
const logger = bunyan.createLogger({
  name: serviceName,
  src: true,
  /*streams: [
    {
      level: "debug",
      stream: process.stdout, // log INFO and above to stdout
    },
    {
      level: "debug",
      path: __dirname + "/logs/appError.log", // log ERROR and above to a file
    },
  ],*/
});
export default logger;
