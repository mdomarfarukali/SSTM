// import express from "express";
// import multer from "multer";
// import cloudinary from "../config/cloudinary.js";

// const router = express.Router();

// // Multer config for memory storage
// const storage = multer.memoryStorage();
// // const upload = multer({ storage });
// const upload = multer({ storage: multer.memoryStorage() });

// // POST /api/upload (single)
// router.post("/upload", upload.single("image"), async (req, res) => {
//     try {
//         if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//         // Upload to Cloudinary
//         const stream = cloudinary.v2.uploader.upload_stream(
//             { folder: "myAppFolder" },
//             (error, result) => {
//                 if (error) return res.status(500).json(error);
//                 res.json({ url: result.secure_url });
//             }
//         );

//         stream.end(req.file.buffer);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Upload failed" });
//     }
// });

// // POST /api/uploads (multiple)
// router.post("/uploads", upload.array("images", 10), async (req, res) => {
//     try {
//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ message: "No files uploaded" });
//         }

//         // Upload to Cloudinary
//         const uploadPromises = req.files.map((file) => {
//             return new Promise((resolve, reject) => {
//                 const stream = cloudinary.v2.uploader.upload_stream(
//                     { folder: "myAppFolder" },
//                     (error, result) => {
//                         if (error) return reject(error);
//                         resolve({ url: result.secure_url });
//                     }
//                 );

//                 stream.end(file.buffer);
//             });
//         });

//         const results = await Promise.all(uploadPromises);
//         res.json({ urls: results });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Upload failed" });
//     }
// });

// export default router;




// // routes/cloudinaryRoute.js
// import express from "express";
// import multer from "multer";
// import cloudinary from "../config/cloudinary.js";

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // **IMPORTANT**: 'images' here must match the field name from frontend
// router.post("/upload", upload.array("images", 10), async (req, res) => {
//     try {
//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ message: "No files uploaded" });
//         }

//         const uploadedImages = [];

//         for (const file of req.files) {
//             const result = await cloudinary.uploader.upload_stream(
//                 { folder: "products" },
//                 (error, result) => {
//                     if (error) throw error;
//                     if (error) {
//                         console.error("Cloudinary upload failed:", error);
//                         return res.status(500).json({ message: "Image upload failed", error });
//                     }
//                     res.json({ image: result });
//                     uploadedImages.push({ url: result.secure_url, public_id: result.public_id });
//                 }
//             );

//             // Using a promise wrapper for upload_stream
//             await new Promise((resolve, reject) => {
//                 const stream = cloudinary.uploader.upload_stream(
//                     { folder: "products" },
//                     (error, result) => {
//                         if (error) return reject(error);
//                         uploadedImages.push({ url: result.secure_url, public_id: result.public_id });
//                         resolve(result);
//                     }
//                 );
//                 stream.end(file.buffer);
//             });
//         }

//         res.status(200).json({ images: uploadedImages });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Cloudinary upload failed", error: err.message });
//     }
// });

// export default router;




// routes/cloudinaryRoute.js
import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Single image upload
router.post("/upload", upload.single("images"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Wrap upload_stream in a promise to use async/await
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "products" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(req.file.buffer);
        });

        // Send uploaded image info to frontend
        res.status(200).json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (err) {
        console.error("Cloudinary upload failed:", err);
        res.status(500).json({
            message: "Image upload failed",
            error: err.message,
        });
    }
});

export default router;
