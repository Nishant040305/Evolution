const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const cloudinary_Config = require('../config/ImageCloudinaryConfig');
cloudinary.config(cloudinary_Config);

const ImageUpload = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve({ message: "No Such File" });
            return;
        }

        // Create a Cloudinary upload stream
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'Evolution' },
            (error, result) => {
                if (error) {
                    console.error('Failed to upload image:', error);
                    resolve({ message: 'Failed to upload image' });
                } else {
                    // Return a JSON response with the image URL
                    resolve({ message: "OK", url: result.secure_url });
                }
            }
        );

        // Stream the file buffer to the Cloudinary upload stream
        const stream = require('stream');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        bufferStream.pipe(uploadStream);
    });
};

module.exports = { ImageUpload };
