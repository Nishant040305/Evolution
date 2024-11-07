const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const router = express.Router();
const ImageController = require("../controller/imageController");
// Multer middleware to handle file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/imageUpload',upload.single('file'),ImageController.ImageUploadProject);

module.exports = router;