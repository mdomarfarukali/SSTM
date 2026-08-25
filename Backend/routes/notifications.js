import express from "express";

import {
getMyNotifications,
getUnreadCount,
markNotificationRead,
markAllNotificationsRead,
deleteNotification,
broadcastOfferNotification
}
from "../controllers/notificationController.js";

import {
isAuthenticatedUser,
authorizeRoles
}
from "../middleware/auth.js";

const router=express.Router();


/* USER ROUTES */

router.get(
"/notifications",
isAuthenticatedUser,
getMyNotifications
);

router.get(
"/notifications/unread-count",
isAuthenticatedUser,
getUnreadCount
);

router.put(
"/notifications/:id/read",
isAuthenticatedUser,
markNotificationRead
);

router.put(
"/notifications/read-all",
isAuthenticatedUser,
markAllNotificationsRead
);

router.delete(
"/notifications/:id",
isAuthenticatedUser,
deleteNotification
);



/* ADMIN OFFER BROADCAST */

router.post(
"/admin/notifications/offer",
isAuthenticatedUser,
authorizeRoles("admin"),
broadcastOfferNotification
);


export default router;