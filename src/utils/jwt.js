import jwt from "jsonwebtoken";
const util = require("util");
const { config } = require("./../property");
const tokenExpiration = 60;

const jwtSignPromise = util.promisify(jwt.sign);
const jwtverifyPromise = util.promisify(jwt.verify);

export const sign = async (details) => {
  return await jwtSignPromise(details, config.jwtSecret, {
    expiresIn: tokenExpiration,
  });
};

export const decode = async (token) => {
  const decoded = await jwtverifyPromise(token, config.jwtSecret);
  console.log(decoded);
  return decoded;
};
