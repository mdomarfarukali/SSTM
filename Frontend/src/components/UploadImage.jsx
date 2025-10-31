import { useState } from "react";

export default function UploadImage() {
    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState("");

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("http://localhost:5000/API/cloudinary/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            setUploadedUrl(data.url);
            console.log("Uploaded URL:", data.url);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Upload
            </button>

            {uploadedUrl && (
                <div>
                    <p>Uploaded Image:</p>
                    <img src={uploadedUrl} alt="Uploaded" className="w-32 mt-2" />
                </div>
            )}
        </div>
    );
}
