import { useEffect, useState } from "react";
import axios from "axios";

const useReviews = (productId) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchReviews = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(
                `/API/reviews/product/${productId}`
            );

            setReviews(data.reviews);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!productId) return;
        fetchReviews();
    }, [productId]);

    return { reviews, refetchReviews: fetchReviews };
};

export default useReviews;