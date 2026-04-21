import { useEffect, useState } from "react";
import axios from "axios";


const useProductData = (productId) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) return;
        const fetchProduct = async () => {
            try {
                setLoading(true);

                const { data } = await axios.get(`/API/products/${productId}`);
                setProduct(data.product || null);

            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return { product, loading };
};

export default useProductData;