import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/common/LoadingSpinner";

function MyReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        rating: 0,
        review: ""
    });

    // fetch my review data
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);

                const { data } = await axios.get("/API/reviews/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                setReviews(data.reviews);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    // console.log("\nReviews", reviews);
    // Render rating stars
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

    // Edit click
    const handleEdit = (review) => {
        setEditingId(review._id);
        setEditData({ rating: review.rating, review: review.review });
    };

    // Save edit
    const handleSave = async (id) => {
        try {
            await axios.put(
                `/api/reviews/${id}`,
                {
                    rating: editData.rating,
                    review: editData.review
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            setReviews((prev) =>
                prev.map((r) =>
                    r._id === id ? { ...r, ...editData } : r
                )
            );

            setEditingId(null);

        } catch (err) {
            console.error(err);
        }
    };

    // Delete review
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/reviews/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            setReviews((prev) => prev.filter((r) => r._id !== id));

        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <LoadingSpinner />;

    // return (
    //     <div style={{ padding: "20px" }}>
    //         <h2>My Reviews & Ratings</h2>

    //         {reviews.length === 0 ? (
    //             <p>No reviews yet</p>
    //         ) : (
    //             reviews.map((review) => (
    //                 <div key={review._id} style={styles.card}>
    //                     <div className="flex gap-3 items-center mb-2">
    //                         <img
    //                             src={review.product_id?.thumbnail}
    //                             alt={review.product_id?.name}
    //                             className="w-14 h-14 object-cover rounded"
    //                         />

    //                         {/* <h3>{review.product_id?.name}</h3> */}
    //                         <div>
    //                             <h3 className="font-semibold">
    //                                 {review.product_id?.name}
    //                             </h3>
    //                         </div>
    //                     </div>
    //                     {/* ⭐ Stars */}
    //                     {editingId === review._id ? (
    //                         <div>
    //                             {renderStars(editData.rating, true, (val) =>
    //                                 setEditData({ ...editData, rating: val })
    //                             )}
    //                         </div>
    //                     ) : (
    //                         <div>{renderStars(review.rating)}</div>
    //                     )}

    //                     {/* 📝 Comment */}
    //                     {editingId === review._id ? (
    //                         <textarea
    //                             value={editData.review}
    //                             onChange={(e) =>
    //                                 setEditData({ ...editData, review: e.target.value })
    //                             }
    //                             style={styles.textarea}
    //                         />
    //                     ) : (
    //                         <p>{review.review}</p>
    //                     )}

    //                     {/* Actions */}
    //                     <div style={styles.actions}>
    //                         {editingId === review._id ? (
    //                             <>
    //                                 <button
    //                                     onClick={() => handleSave(review._id)}
    //                                     // style={styles.saveBtn}
    //                                     className="bg-green-500 text-white px-3 py-1 rounded"
    //                                 >
    //                                     Save
    //                                 </button>
    //                                 <button
    //                                     onClick={() => setEditingId(null)}
    //                                     // style={styles.cancelBtn}
    //                                     className="bg-gray-500 text-white px-3 py-1 rounded"
    //                                 >
    //                                     Cancel
    //                                 </button>
    //                             </>
    //                         ) : (
    //                             <>
    //                                 <button
    //                                     onClick={() => handleEdit(review)}
    //                                     // style={styles.editBtn}
    //                                     className="bg-blue-500 text-white px-3 py-1 rounded"
    //                                 >
    //                                     Edit
    //                                 </button>
    //                                 <button
    //                                     onClick={() => handleDelete(review._id)}
    //                                     // style={styles.deleteBtn}
    //                                     className="bg-red-500 text-white px-3 py-1 rounded"
    //                                 >
    //                                     Delete
    //                                 </button>
    //                             </>
    //                         )}
    //                     </div>
    //                 </div>
    //             ))
    //         )}
    //     </div>
    // );

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">My Reviews & Ratings</h2>

            {reviews.length === 0 ? (
                <p className="text-gray-500 italic text-center py-8">No reviews yet</p>
            ) : (
                reviews.map((review) => (
                    <div
                        key={review._id}
                        className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden hover:shadow-md transition-shadow duration-300"
                    >
                        {/* Left Side: Product Info */}
                        <div className="w-full md:w-1/3 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50/50">
                            <img
                                src={review.product_id?.thumbnail}
                                alt={review.product_id?.name}
                                className="w-24 h-24 object-cover rounded-lg shadow-sm mb-4"
                            />
                            <h3 className="font-semibold text-gray-800 text-center text-lg">
                                {review.product_id?.name}
                            </h3>
                        </div>

                        {/* Right Side: Rating, Comment & Actions */}
                        <div className="w-full md:w-2/3 p-6 flex flex-col justify-between bg-white">
                            <div className="flex-grow">
                                {/* ⭐ Stars */}
                                <div className="mb-4">
                                    {editingId === review._id ? (
                                        <div className="inline-block bg-gray-50 p-2 rounded-lg border border-gray-100">
                                            {renderStars(editData.rating, true, (val) =>
                                                setEditData({ ...editData, rating: val })
                                            )}
                                        </div>
                                    ) : (
                                        <div>{renderStars(review.rating)}</div>
                                    )}
                                </div>

                                {/* 📝 Comment */}
                                {editingId === review._id ? (
                                    <textarea
                                        value={editData.review}
                                        onChange={(e) =>
                                            setEditData({ ...editData, review: e.target.value })
                                        }
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y min-h-[120px] text-gray-700 transition-all"
                                        placeholder="Write your review here..."
                                    />
                                ) : (
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                        {review.review}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
                                {editingId === review._id ? (
                                    <>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleSave(review._id)}
                                            className="px-5 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm"
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(review)}
                                            className="px-5 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="px-5 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
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
};
export default MyReviews;