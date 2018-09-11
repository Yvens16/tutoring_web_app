const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_KEY,
  api_secret: process.env.cloudinary_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "user-notes",
  params: {
    ressource_type: "raw"
  }
});

const fileUploader = multer({ storage });

module.exports = fileUploader;
