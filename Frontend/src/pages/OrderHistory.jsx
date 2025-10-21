import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaClock, FaCheckCircle } from "react-icons/fa";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-brand-light pt-24 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-brand mb-10 text-center">
          Order History
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-24">
            <FaShoppingBag className="text-6xl text-brand-muted mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-brand-muted mb-4">
              You have no orders yet.
            </h2>
            <p className="text-brand-muted">
              Explore our{" "}
              <Link
                to="/products"
                className="text-brand-primary hover:underline"
              >
                collections
              </Link>{" "}
              and place your first order.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order, index) => (
              <div
                key={index}
                className="border border-brand-muted rounded-2xl shadow-md hover:shadow-xl transition bg-brand p-6"
              >
                {/* Order Header */}
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-brand">
                    Order #{order.id || index + 1}
                  </h2>
                  <div className="flex items-center gap-2 text-brand-muted">
                    <FaClock />
                    <span>{order.date || "Recently placed"}</span>
                  </div>
                </div>

                {/* Ordered Items */}
                <div>
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-brand">
                            {item.name}
                          </h3>
                          <p className="text-sm text-brand-muted">
                            Size: {item.selectedSize}
                          </p>
                          <p className="text-sm text-brand-muted">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-brand-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      {/* Manual divider between items (except last one) */}
                      {idx !== order.items.length - 1 && (
                        <hr className="border-t border-brand-muted" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="mt-6 flex justify-between items-center border-t border-brand-muted pt-4">
                  <div className="flex items-center gap-2 text-brand-success">
                    <FaCheckCircle />
                    <span className="font-medium">Delivered</span>
                  </div>
                  <p className="text-xl font-bold text-brand">
                    Total: $
                    {order.items
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
