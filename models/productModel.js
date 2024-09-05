import mongoose from "mongoose";

const Product = mongoose.Schema(
    {
        id:{
            type:Number,
            required:true
        },
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        totalofstocks: {
            type: Number,
            required: true
        },
        available: {
            type: Boolean,
            default: true
        },
        date:{
            type: Date,
            default:Date.now
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Product", Product)