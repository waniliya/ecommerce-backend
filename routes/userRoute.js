import express from "express";
import { deleteUser, getUserById, updateUser, getUser, registerUser } from "../controller/userController.js";
import { verifyUser } from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/alluser',/*verifyAdmin,*/ getUser);
router.get('/user/:id',/*verifyUser,*/ getUserById);
router.post('/newuser', registerUser);
router.patch('/user/:id',verifyUser, updateUser);
router.delete('/user/:id',verifyUser, deleteUser);


export default router;