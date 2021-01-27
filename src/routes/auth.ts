const { Router } = require("express");
const route = Router();
import { login } from "../controllers/auth";

route.post("/login", login);
export default route;
