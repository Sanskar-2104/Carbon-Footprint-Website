import multer from "multer";
import path from "path";

const storage = multer.memoryStorage(); // To use buffer in Gemini API
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error("Only images and PDFs are allowed"));
    },
});

export default upload;
