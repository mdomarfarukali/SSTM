import Product from "../models/Product.js";
import slugify from "slugify";

/* =========================================================
   🟢 CREATE PRODUCT
========================================================= */
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            category,
            gender,
            material,
            purity,
            gemstone,
            gemstoneWeight,
            metalWeight,
            price,
            discount,
            stock,
            description,
            shortDescription,
            tags,
            specifications,
            collection,
        } = req.body;

        // Slug for SEO-friendly URLs
        const slug = slugify(name, { lower: true, strict: true });

        // Construct product
        const product = await Product.create({
            name,
            slug,
            category,
            gender,
            material,
            purity,
            gemstone,
            gemstoneWeight,
            metalWeight,
            price,
            discount,
            stock,
            description,
            shortDescription,
            tags,
            specifications,
            collection,
            images: req.body.images || [],
            thumbnail: req.body.thumbnail || "",
        });

        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* =========================================================
   🟢 GET ALL PRODUCTS (with Filters, Sorting, Pagination)
========================================================= */
export const getAllProducts = async (req, res) => {
    try {
        const {
            category,
            material,
            gender,
            minPrice,
            maxPrice,
            sort,
            search,
            page = 1,
            limit = 20,
        } = req.query;

        const query = {};

        if (category) query.category = category;
        if (material) query.material = material;
        if (gender) query.gender = gender;
        if (minPrice || maxPrice)
            query.price = {
                ...(minPrice && { $gte: Number(minPrice) }),
                ...(maxPrice && { $lte: Number(maxPrice) }),
            };
        if (search)
            query.name = { $regex: search, $options: "i" }; // case-insensitive

        let mongooseQuery = Product.find(query);

        // Sorting
        if (sort) {
            const sortOption =
                sort === "price_asc"
                    ? { price: 1 }
                    : sort === "price_desc"
                        ? { price: -1 }
                        : sort === "newest"
                            ? { createdAt: -1 }
                            : sort === "rating"
                                ? { rating: -1 }
                                : {};
            mongooseQuery = mongooseQuery.sort(sortOption);
        }

        // Pagination
        const skip = (page - 1) * limit;
        mongooseQuery = mongooseQuery.skip(skip).limit(Number(limit));

        const products = await mongooseQuery.exec();
        const total = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            count: products.length,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            products,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* =========================================================
   🟢 GET SINGLE PRODUCT BY ID OR SLUG
========================================================= */
export const getProduct = async (req, res) => {
    try {
        const { idOrSlug } = req.params;

        const product =
            (await Product.findOne({ slug: idOrSlug })) ||
            (await Product.findById(idOrSlug));

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* =========================================================
   🟢 UPDATE PRODUCT
========================================================= */
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.body.name) {
            req.body.slug = slugify(req.body.name, { lower: true, strict: true });
        }

        const updated = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* =========================================================
   🟢 DELETE PRODUCT
========================================================= */
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* =========================================================
   🟢 ADD REVIEW TO PRODUCT
========================================================= */
export const addReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { userId, name, rating, comment } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === userId
        );
        if (alreadyReviewed) {
            return res
                .status(400)
                .json({ success: false, message: "You already reviewed this product" });
        }

        const review = {
            user: userId,
            name,
            rating: Number(rating),
            comment,
        };

        product.reviews.push(review);

        // Recalculate average rating
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => acc + item.rating, 0) /
            product.reviews.length;

        await product.save();

        res.status(201).json({ success: true, message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* =========================================================
   🟢 GET FEATURED / NEW ARRIVALS / BEST SELLERS
========================================================= */
export const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({ isFeatured: true }).limit(10);
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getNewArrivals = async (req, res) => {
    try {
        const products = await Product.find({ isNewArrival: true })
            .sort({ createdAt: -1 })
            .limit(10);
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBestSellers = async (req, res) => {
    try {
        const products = await Product.find({ isBestSeller: true }).limit(10);
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
