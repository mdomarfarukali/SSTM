import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TrackOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        // TODO: CONNECT BACKEND API HERE
        // const res = await fetch(`/api/orders/${orderId}`);
        // const data = await res.json();
        // setOrder(data);

        // Dummy Data
        const data = {
          id: orderId || "ORD12345",
          status: "Out for Delivery",
          estimatedDelivery: "2026-04-16",
          deliveryPartner: {
            name: "Delhivery",
            phone: "9876543210",
          },
          items: [
            { id: 1, name: "Perfume", price: 1200 },
            { id: 2, name: "Face Wash", price: 299 },
          ],
        };

        setOrder(data);
      } catch (err) {
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const steps = ["Ordered", "Shipped", "Out for Delivery", "Delivered"];
  const getStepIndex = (status) => steps.indexOf(status);

  // 🔴 Cancel Order
  const handleCancel = () => {
    // TODO: CALL BACKEND API
    // await fetch(`/api/orders/${orderId}/cancel`, { method: "POST" });

    alert("Order Cancelled!");
  };

  // 🔄 Return Order
  const handleReturn = () => {
    // TODO: CALL BACKEND API
    // await fetch(`/api/orders/${orderId}/return`, { method: "POST" });

    alert("Return Request Placed!");
  };

  if (loading) return <p>Loading order...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return <p>No order found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Track Order</h2>

      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Status:</strong> {order.status}</p>

      {/* 📅 Estimated Delivery */}
      <p>
        <strong>Estimated Delivery:</strong> {order.estimatedDelivery}
      </p>

      {/* 🚚 Delivery Partner */}
      <div style={styles.card}>
        <h4>Delivery Partner</h4>
        <p>{order.deliveryPartner.name}</p>
        <p>📞 {order.deliveryPartner.phone}</p>
      </div>

      {/* 🚦 Progress */}
      <div style={styles.progressContainer}>
        {steps.map((step, index) => (
          <div key={index} style={styles.stepWrapper}>
            <div
              style={{
                ...styles.circle,
                background:
                  index <= getStepIndex(order.status)
                    ? "#4caf50"
                    : "#ccc",
              }}
            >
              {index + 1}
            </div>
            <p style={styles.label}>{step}</p>
          </div>
        ))}
      </div>

      {/* 📦 Items */}
      <h3 style={{ marginTop: "20px" }}>Items</h3>
      {order.items.map((item) => (
        <div key={item.id} style={styles.card}>
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
        </div>
      ))}

      {/* ❌ Cancel Button */}
      {order.status !== "Delivered" && (
        <button style={styles.cancelBtn} onClick={handleCancel}>
          Cancel Order
        </button>
      )}

      {/* 🔄 Return Button */}
      {order.status === "Delivered" && (
        <button style={styles.returnBtn} onClick={handleReturn}>
          Return / Replace
        </button>
      )}
    </div>
  );
}

// Styles
const styles = {
  progressContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  stepWrapper: {
    textAlign: "center",
    flex: 1,
  },
  circle: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  },
  label: {
    marginTop: "5px",
    fontSize: "12px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    marginTop: "10px",
  },
  cancelBtn: {
    marginTop: "20px",
    padding: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  returnBtn: {
    marginTop: "20px",
    padding: "10px",
    background: "orange",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};