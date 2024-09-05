import Order from "../models/orderModel.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";

export const newOrder = async (req, res) => {
    /* The request.body must have all these values */
    
    try {
        let user = await User.findOne({_id:req.body.userId});
        const neworder = new Order ({
            userId: user.id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true
            
        })
        console.log(neworder);
        await neworder.save();
        await User.findByIdAndUpdate(req.body.userId,{cartData:{}});
        console.log("Done Order");
        res.json({
            success:true,
        })
    } catch (error) {
        console.log({success:false, message:error.message})
    }

}

//admin
export const getAllOrder = async (req, res) => {
    try{
        const allOrder = await Order.find({});
        res.json(allOrder);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

export const getOrderTrack = async (req, res) => {
    try{
        const order = await Order.find({userId:req.body.userId});
        res.status(200).json(order);
        //res.json({success:true, data:order});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

export const updateStatus = async (req,res) => {
    try{
        const updatedStatus = await Order.updateOne({_id:req.params.id}, {$set:req.body});
        res.status(200).json(updatedStatus);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
}


/*export const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body
    try {
    if(success="true"){
    await Order.FindByldAndupdate (orderId, {payment: true});
    res.json({success: true, message: "Paid"})
    }else{
    await Order.findByIdAndDelete (orderId)
    res.json({success: false, message: "Not paid"})
    }
    } catch (error) {
    console.log(error)
    res.json({success: false, message: "Error"})
    }
}*/

