import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index:true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },

    type:{
        type:String,
        enum:[
            "order",
            "price_drop",
            "stock",
            "offer",
            "system"
        ],
        default:"system"
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    message:{
        type:String,
        required:true
    },

    read:{
        type:Boolean,
        default:false
    },

    link:{
        type:String
    }

},
{timestamps:true}
);

export default mongoose.model(
"Notification",
notificationSchema
);