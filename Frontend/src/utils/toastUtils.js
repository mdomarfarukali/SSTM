// utils/toastUtils.js
import { toast } from "react-hot-toast";

/**
 * Displays a toast notification with a specific message and type.
 * 
 * @param {string} message - The message to display in the toast.
 * @param {'success' | 'error' | 'info' | 'warning'} type - The type of toast.
 */
export const showToast = (message, type = "info") => {
    switch (type) {
        case "success":
            toast.success(message, {
                style: {
                    borderRadius: "8px",
                    background: "#10B981", // green-500
                    color: "#fff",
                    fontWeight: "500",
                },
                duration: 2500,
            });
            break;

        case "error":
            toast.error(message, {
                style: {
                    borderRadius: "8px",
                    background: "#EF4444", // red-500
                    color: "#fff",
                    fontWeight: "500",
                },
                duration: 3000,
            });
            break;

        case "warning":
            toast(message, {
                style: {
                    borderRadius: "8px",
                    background: "#F59E0B", // amber-500
                    color: "#fff",
                    fontWeight: "500",
                },
                icon: "⚠️",
                duration: 3000,
            });
            break;

        case "info":
        default:
            toast(message, {
                style: {
                    borderRadius: "8px",
                    background: "#3B82F6", // blue-500
                    color: "#fff",
                    fontWeight: "500",
                },
                icon: "ℹ️",
                duration: 2500,
            });
            break;
    }
};
