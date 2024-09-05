import express from "express"
import { getAllOrder, getOrderTrack, newOrder, updateStatus } from "../controller/orderController.js"
import { fetchUser } from "../controller/productController.js";

const router = express.Router()
router.get('/allorder', getAllOrder); //admin
router.patch('/update/:id', updateStatus); //admin
router.post('/placeorder', newOrder);
router.get('/myorder',fetchUser,getOrderTrack);  //user

export default router;