const cloudinary = require("./cloudinary.config"); // Import the Cloudinary config

// Function to upload a file to Cloudinary
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "Product/Images", // Specify a folder in Cloudinary (optional)
      use_filename: true, // Use the original file name
    });
    return result; // The result contains the file URL and other metadata
  } catch (error) {
    throw new Error("Error uploading to Cloudinary: " + error.message);
  }
};

// Function to delete a file from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result; // The result will tell whether the deletion was successful
  } catch (error) {
    throw new Error("Error deleting from Cloudinary: " + error.message);
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
