import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        // 🪪 Basic Info
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            maxlength: 120,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },

        // 💍 Category & Type
        category: {
            type: String,
            required: [true, "Category is required"], // e.g., "Necklace", "Ring", "Bracelet"
            enum: [
                "Necklace",
                "Ring",
                "Earrings",
                "Bracelet",
                "Pendant",
                "Anklet",
                "Bangle",
                "Brooch",
                "Chain",
                "Others",
            ],
        },
        gender: {
            type: String,
            enum: ["Women", "Men", "Unisex"],
            default: "Unisex",
        },
        collection: {
            type: String, // e.g., "Wedding Collection", "Festive Special"
            default: "Regular",
        },

        // 🪶 Material Details
        material: {
            type: String,
            required: true,
            enum: ["Gold", "Silver", "Diamond", "Platinum", "Artificial", "Other"],
        },
        purity: {
            type: String, // e.g., "22K", "18K", "925 Silver"
        },
        gemstone: {
            type: String, // e.g., "Ruby", "Emerald", "Sapphire"
        },
        gemstoneWeight: {
            type: Number, // in carats
        },
        metalWeight: {
            type: Number, // in grams
        },
        // sizes: [
        //     {
        //         type: String, // e.g., "6", "7", "8" for rings; "S", "M", "L" for bracelets
        //         enum: ["6", "7", "8", "9", "10", "S", "M", "L", "XL"],
        //     },
        // ],

        // 💰 Pricing
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: 0,
        },
        discount: {
            type: Number, // percentage
            default: 0,
        },
        finalPrice: {
            type: Number, // auto-calculated (price - discount)
        },

        // 🖼️ Images
        images: [
            {
                public_id: { type: String }, // Cloudinary or AWS S3 ID
                url: { type: String },
            },
        ],
        thumbnail: {
            type: String, // primary image
        },

        // 📦 Stock & Availability
        stock: {
            type: Number,
            required: [true, "Stock quantity is required"],
            min: 0,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
        sku: {
            type: String,
            unique: true,
            sparse: true,
        },

        // 🏷️ Tags, Description & Specifications
        description: {
            type: String,
            trim: true,
        },
        shortDescription: {
            type: String,
            maxlength: 160,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        specifications: {
            type: Map,
            of: String, // Flexible key-value pairs (e.g., claspType: "Hook", length: "18cm")
        },

        // ⭐ Reviews & Ratings
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                name: String,
                rating: Number,
                comment: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        // 🕒 Metadata
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isNewArrival: {
            type: Boolean,
            default: false,
        },
        isBestSeller: {
            type: Boolean,
            default: false,
        },

        // 🔍 SEO (Optional)
        metaTitle: String,
        metaDescription: String,
    },
    { timestamps: true }
);

// Auto-calculate finalPrice before save
productSchema.pre("save", function (next) {
    if (this.discount > 0) {
        this.finalPrice = this.price - (this.price * this.discount) / 100;
    } else {
        this.finalPrice = this.price;
    }
    next();
});

export default mongoose.model("Product", productSchema);
