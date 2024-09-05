import mongoose from "mongoose";

const Order = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        address: {
            type: Object,
            required: true
        },
        status: {
            type: String,
            default: "Product Loading..."
        },
        date: {
            type:Date,
            default:Date.now
        },
        payment: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true
    }
)

export default mongoose.model("Order", Order)