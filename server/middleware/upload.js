const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "portfolio_projects",
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{ width: 800, height: 600, crop: "limit" }],
    },
});

const upload = multer({ storage });

module.exports = upload;
