import { useEffect, useState } from "react";

export default function MyCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestCoupon, setBestCoupon] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const cartTotal = 1200; // 🛒 TODO: replace with real cart value

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);

        // TODO: CONNECT BACKEND API HERE
        // const res = await fetch("/api/coupons");
        // const data = await res.json();
        // setCoupons(data);

        // Dummy Data (UPDATED STRUCTURE)
        const data = [
          {
            id: 1,
            code: "SAVE10",
            type: "percentage",
            value: 10,
            expiry: "2026-12-31",
          },
          {
            id: 2,
            code: "FLAT200",
            type: "flat",
            value: 200,
            expiry: "2026-10-01",
          },
          {
            id: 3,
            code: "OLD50",
            type: "percentage",
            value: 50,
            expiry: "2024-01-01", // expired
          },
        ];

        setCoupons(data);
        findBestCoupon(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  // 📅 Check expired
  const isExpired = (date) => {
    return new Date(date) < new Date();
  };

  // 💰 Calculate discount
  const calculateDiscount = (coupon) => {
    if (coupon.type === "percentage") {
      return (cartTotal * coupon.value) / 100;
    }
    return coupon.value;
  };

  // 🧠 Auto find best coupon
  const findBestCoupon = (couponsList) => {
    let best = null;
    let maxDiscount = 0;

    couponsList.forEach((c) => {
      if (!isExpired(c.expiry)) {
        const discount = calculateDiscount(c);

        if (discount > maxDiscount) {
          maxDiscount = discount;
          best = c;
        }
      }
    });

    if (best) {
      setBestCoupon({ ...best, discount: maxDiscount });

      // ✅ AUTO APPLY
      setAppliedCoupon({ ...best, discount: maxDiscount });
    }
  };

  // 📋 Copy coupon
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Coupon copied!");
  };

  // 🟢 Apply coupon manually
  const handleApply = (coupon) => {
    const discount = calculateDiscount(coupon);

    setAppliedCoupon({ ...coupon, discount });

    // TODO: APPLY COUPON API
    // await fetch("/api/apply-coupon", { method: "POST", body: JSON.stringify({ code: coupon.code }) });

    alert(`Coupon ${coupon.code} applied!`);
  };

  if (loading) return <p>Loading coupons...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Coupons</h2>

      {/* 🏆 Best Coupon */}
      {bestCoupon && (
        <div style={styles.bestCard}>
          <h3>Best Coupon: {bestCoupon.code}</h3>
          <p>Save ₹{bestCoupon.discount}</p>
        </div>
      )}

      {/* 💰 Discount Preview */}
      {appliedCoupon && (
        <div style={styles.preview}>
          <p>
            Applied: <strong>{appliedCoupon.code}</strong>
          </p>
          <p style={{ color: "green" }}>
            You save ₹{appliedCoupon.discount}
          </p>
          <h3>Total: ₹{cartTotal - appliedCoupon.discount}</h3>
        </div>
      )}

      {coupons.length === 0 ? (
        <p>No coupons available</p>
      ) : (
        coupons.map((coupon) => {
          const expired = isExpired(coupon.expiry);

          return (
            <div
              key={coupon.id}
              style={{
                ...styles.card,
                opacity: expired ? 0.5 : 1,
              }}
            >
              <h3>{coupon.code}</h3>

              <p>
                {coupon.type === "percentage"
                  ? `${coupon.value}% OFF`
                  : `₹${coupon.value} OFF`}
              </p>

              <small>Expires on: {coupon.expiry}</small>

              {expired && <p style={{ color: "red" }}>Expired</p>}

              <div style={styles.actions}>
                {/* 📋 Copy */}
                <button
                  onClick={() => handleCopy(coupon.code)}
                  style={styles.copyBtn}
                >
                  Copy
                </button>

                {/* 🟢 Apply */}
                {!expired && (
                  <button
                    onClick={() => handleApply(coupon)}
                    style={styles.applyBtn}
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          );
        })
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
    background: "#fff",
  },
  bestCard: {
    border: "2px solid green",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "15px",
    background: "#f1fff1",
  },
  preview: {
    border: "1px dashed green",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    background: "#f9fff9",
  },
  actions: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  copyBtn: {
    padding: "8px",
    background: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  applyBtn: {
    padding: "8px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};