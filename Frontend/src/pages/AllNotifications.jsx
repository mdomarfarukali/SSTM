import { useEffect, useState } from "react";

export default function MyNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);

        // TODO: CONNECT BACKEND API HERE
        // const res = await fetch("/api/notifications");
        // const data = await res.json();
        // setNotifications(data);

        // Dummy Data
        const data = [
          {
            id: 1,
            message: "Your order has been shipped",
            createdAt: "2026-04-14T10:00:00",
            read: false,
          },
          {
            id: 2,
            message: "New discount available!",
            createdAt: "2026-04-13T08:00:00",
            read: true,
          },
        ];

        setNotifications(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // ⏱ Time ago function
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = [
      { label: "year", value: 31536000 },
      { label: "month", value: 2592000 },
      { label: "day", value: 86400 },
      { label: "hour", value: 3600 },
      { label: "minute", value: 60 },
    ];

    for (let i of intervals) {
      const count = Math.floor(seconds / i.value);
      if (count > 0) return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

  // ✅ Mark as read
  const markAsRead = (id) => {
    // TODO: API CALL
    // await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  // 🗑 Delete
  const handleDelete = (id) => {
    // TODO: API CALL
    // await fetch(`/api/notifications/${id}`, { method: "DELETE" });

    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // 🧹 Clear all
  const clearAll = () => {
    // TODO: API CALL
    // await fetch(`/api/notifications/clear`, { method: "DELETE" });

    setNotifications([]);
  };

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Notifications</h2>

      {notifications.length > 0 && (
        <button onClick={clearAll} style={styles.clearBtn}>
          Clear All
        </button>
      )}

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            style={{
              ...styles.card,
              background: n.read ? "#fff" : "#e3f2fd",
            }}
          >
            <p>{n.message}</p>
            <small>{timeAgo(n.createdAt)}</small>

            <div style={styles.actions}>
              {!n.read && (
                <button
                  onClick={() => markAsRead(n.id)}
                  style={styles.readBtn}
                >
                  Mark as Read
                </button>
              )}

              <button
                onClick={() => handleDelete(n.id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Styles
const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    marginTop: "10px",
  },
  actions: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  readBtn: {
    background: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
  },
  deleteBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
  },
  clearBtn: {
    marginBottom: "10px",
    padding: "8px",
    background: "black",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};