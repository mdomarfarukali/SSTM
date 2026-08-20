import { useEffect, useState } from "react";
import axios from "axios";
import { useWishlistContext } from "../../context/WishListContext";

const useRecommendedProducts = (id) => {
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    const { isItemWished } = useWishlistContext();

    useEffect(() => {
        if (!id) return;

        const fetchRecommendedProducts = async () => {
            try {
                setLoading(true);

                const { data } = await axios.get("/API/products");

                const filtered = data.products
                    .filter(p => p._id !== id)
                    .slice(0, 6)
                    .map(product => ({
                        ...product,
                        isWished: isItemWished(product._id),
                    }));

                setRecommended(filtered);
                console.log("Filtered: ", filtered);

            } catch (error) {
                console.error("Error fetching recommended products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedProducts();
    }, [id, isItemWished]); // ⚠️ include dependency

    return recommended;
};

export default useRecommendedProducts;