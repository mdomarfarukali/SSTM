import { useEffect, useState } from "react";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        // TODO: CONNECT BACKEND API HERE
        // const res = await fetch("/api/reviews");
        // const data = await res.json();
        // setReviews(data);

        // Dummy Data
        const data = [
          {
            id: 1,
            productName: "Lipstick",
            rating: 4,
            comment: "Nice quality!",
          },
          {
            id: 2,
            productName: "Face Wash",
            rating: 5,
            comment: "Amazing product!",
          },
        ];

        setReviews(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // ⭐ Render stars
  const renderStars = (rating, clickable = false, onClick = () => { }) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        onClick={() => clickable && onClick(i + 1)}
        style={{
          cursor: clickable ? "pointer" : "default",
          color: i < rating ? "gold" : "#ccc",
          fontSize: "18px",
        }}
      >
        ★
      </span>
    ));
  };

  // ✏️ Edit click
  const handleEdit = (review) => {
    setEditingId(review._id);
    setEditData({ rating: review.rating, comment: review.review });
  };

  // 💾 Save edit
  const handleSave = async (id) => {
    // TODO: API CALL
    // await fetch(`/api/reviews/${id}`, { method: "PUT", body: JSON.stringify(editData) });

    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, ...editData } : r
      )
    );

    setEditingId(null);
  };

  // ❌ Delete review
  const handleDelete = async (id) => {
    // TODO: API CALL
    // await fetch(`/api/reviews/${id}`, { method: "DELETE" });

    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Reviews & Ratings</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} style={styles.card}>
            <h3>{review.productName}</h3>

            {/* ⭐ Stars */}
            {editingId === review.id ? (
              <div>
                {renderStars(editData.rating, true, (val) =>
                  setEditData({ ...editData, rating: val })
                )}
              </div>
            ) : (
              <div>{renderStars(review.rating)}</div>
            )}

            {/* 📝 Comment */}
            {editingId === review.id ? (
              <textarea
                value={editData.comment}
                onChange={(e) =>
                  setEditData({ ...editData, comment: e.target.value })
                }
                style={styles.textarea}
              />
            ) : (
              <p>{review.comment}</p>
            )}

            {/* Actions */}
            <div style={styles.actions}>
              {editingId === review.id ? (
                <>
                  <button
                    onClick={() => handleSave(review.id)}
                    style={styles.saveBtn}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(review)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </>
              )}
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
    background: "#fff",
  },
  textarea: {
    width: "100%",
    marginTop: "10px",
    padding: "8px",
    borderRadius: "5px",
  },
  actions: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  editBtn: {
    background: "#2196f3",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: "5px",
  },
  deleteBtn: {
    background: "red",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: "5px",
  },
  saveBtn: {
    background: "green",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: "5px",
  },
  cancelBtn: {
    background: "gray",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: "5px",
  },
};