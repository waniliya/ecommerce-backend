import express from "express";
import { Login, LoginAdmin, Logout } from "../controller/authController.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.get('/getuser',verifyUser);
router.post ('/login',Login);
router.post ('/loginadmin', LoginAdmin);
router.delete('/logout', Logout);


export default router;