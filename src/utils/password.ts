import bcrypt from "bcrypt";
import {promisify} from 'util'


const SALT_ROUNDS = 10;
const hashPromise = promisify(bcrypt.hash);
const comparePromise = promisify(bcrypt.compare);

export const hashPassword = async (password:string) => {
  return await hashPromise(password, SALT_ROUNDS);
};

export const matchPassword = async (hash:string, password:string) => {
  return await comparePromise(password, hash);
};
