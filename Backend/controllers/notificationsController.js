import Notification from "../models/notification.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";


/* =========================================
   GET MY NOTIFICATIONS
========================================= */
export const getMyNotifications =
catchAsyncErrors(async(req,res,next)=>{

const notifications=
await Notification.find({
user:req.user.id
})
.populate("product","name slug images")
.sort({createdAt:-1});

res.status(200).json({
success:true,
count:notifications.length,
notifications
});

});


/* =========================================
   UNREAD COUNT
========================================= */
export const getUnreadCount =
catchAsyncErrors(async(req,res,next)=>{

const count=
await Notification.countDocuments({
user:req.user.id,
read:false
});

res.status(200).json({
success:true,
unreadCount:count
});

});


/* =========================================
   MARK SINGLE READ
========================================= */
export const markNotificationRead =
catchAsyncErrors(async(req,res,next)=>{

const notification=
await Notification.findOne({
_id:req.params.id,
user:req.user.id
});

if(!notification){
return next(
new ErrorHandler(
"Notification not found",
404
)
);
}

notification.read=true;

await notification.save();

res.status(200).json({
success:true,
message:"Notification marked read"
});

});


/* =========================================
   MARK ALL READ
========================================= */
export const markAllNotificationsRead =
catchAsyncErrors(async(req,res)=>{

await Notification.updateMany(
{
user:req.user.id,
read:false
},
{
read:true
}
);

res.status(200).json({
success:true,
message:"All notifications marked read"
});

});


/* =========================================
   DELETE NOTIFICATION
========================================= */
export const deleteNotification=
catchAsyncErrors(async(req,res,next)=>{

const notification=
await Notification.findOne({
_id:req.params.id,
user:req.user.id
});

if(!notification){
return next(
new ErrorHandler(
"Notification not found",
404
)
);
}

await notification.deleteOne();

res.status(200).json({
success:true,
message:"Notification deleted"
});

});


/* =========================================
 ADMIN BROADCAST OFFER
========================================= */
export const broadcastOfferNotification=
catchAsyncErrors(async(req,res)=>{

const {title,message}=req.body;

const users=
await User.find().select("_id");

const docs=
users.map(user=>({
user:user._id,
type:"offer",
title,
message
}));

await Notification.insertMany(
docs
);

res.status(200).json({
success:true,
message:"Offer notification sent"
});

});