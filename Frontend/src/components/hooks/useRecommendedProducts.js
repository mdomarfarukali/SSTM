import { useEffect, useState } from "react";
import axios from "axios";

const useRecommendedProducts = (id) => { //id is for personalized prodct, will use later.
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchRecommendedProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/API/products");

                // console.log("Recommended data: ", data);
                const filtered = data.products
                    .filter(p => p._id !== id)
                    .slice(0, 6);

                setRecommended(filtered);
            } catch (error) {
                console.error("Error fetching recommended products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedProducts();
    }, [id]);

    return recommended;
};

export default useRecommendedProducts;