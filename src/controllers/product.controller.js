const Product = require("../models/product.model");
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary.config');
const APIError = require("../utils/eror.midelware");

exports.createProduct = async (req, res) => {
  try {
    // Check if form data is present
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No form data provided" });
    }

    // Check if image files are present
    if (!req.files || !req.files.mainRoomImg || !req.files.roomImgs) {
      return res.status(400).json({ error: "Image files are missing" });
    }

    // Extract product details from the request body
    const { title, description, location, roomNumber, CatalogBaths, catalogPrice, catalogBed, latitude, longitude } = req.body;
    const product = await Product.findById(req.params.id);

    
    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      throw new APIError("This product name already exists!", 409);
    }

    const existingProductRoom = await Product.findOne({ roomNumber });
    if (existingProductRoom) {
      throw new APIError("This room number already exists!", 409);
    }

    // Handle photo uploads
    const photoMainFile = req.files?.mainRoomImg;
    const photosFiles = req.files?.roomImgs;

    let photoMainUrl = null;
    let photosUrls = [];

    if (photoMainFile) {
      const uploadedMainPhoto = await uploadToCloudinary(photoMainFile.tempFilePath, {
        use_filename: true,
        // folder: "Product/MainPhotos"
      });
      photoMainUrl = uploadedMainPhoto.url;
    }

    if (photosFiles && Array.isArray(photosFiles)) {
      for (const file of photosFiles) {
        const uploadedPhoto = await uploadToCloudinary(file.tempFilePath, {
          use_filename: true,
          // folder: "Product/AdditionalPhotos"
        });
        photosUrls.push(uploadedPhoto.url);
      }
    } else if (photosFiles) {
      const uploadedPhoto = await uploadToCloudinary(photosFiles.tempFilePath, {
        use_filename: true,
        // folder: "Product/AdditionalPhotos"
      });
      photosUrls.push(uploadedPhoto.url);
    }

    // Create new product instance
    const newProduct = new Product({
      title,
      mainRoomImg: photoMainUrl, // Main photo URL
      roomImgs: photosUrls,      // Additional room photo URLs
      description,
      location,
      roomNumber,
      CatalogBaths,
      catalogPrice,
      catalogBed,
      latitude,
      longitude,
    });

    // Save the new product to the database
    await newProduct.save();

    // Populate references and send the response
    const populatedProduct = await Product.findById(newProduct._id)
      .populate("CatalogBaths")
      .populate("catalogPrice")
      .populate("catalogBed");

    res.status(201).json(populatedProduct);  // Successfully created
  } catch (error) {
    res.status(400).json({ error: error.message });  // Error response
  }
};

// Controller to get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("CatalogBaths")
      .populate("catalogPrice")
      .populate("catalogBed");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Delete old main image if a new one is provided
    if (req.files && req.files.mainRoomImg) {
      await deleteFromCloudinary(product.mainRoomImg);
      const newMainRoomImgUrl = await uploadToCloudinary(req.files.mainRoomImg[0].buffer);
      product.mainRoomImg = newMainRoomImgUrl;
    }

    // Delete old room images if new ones are provided
    if (req.files && req.files.roomImgs) {
      for (const oldImgUrl of product.roomImgs) {
        await deleteFromCloudinary(oldImgUrl);
      }

      const roomImgsUrls = await Promise.all(
        req.files.roomImgs.map(async (img) => await uploadToCloudinary(img.buffer))
      );
      product.roomImgs = roomImgsUrls;
    }

    // Update other fields
    const { title, description, location, roomNumber, CatalogBaths, catalogPrice, catalogBed, latitude, longitude } = req.body;
    product.title = title;
    product.description = description;
    product.location = location;
    product.roomNumber = roomNumber;
    product.CatalogBaths = CatalogBaths;
    product.catalogPrice = catalogPrice;
    product.catalogBed = catalogBed;
    product.latitude = latitude;
    product.longitude = longitude;

    // Save the updated product
    await product.save();

    // Populate references and send the updated product
    const populatedProduct = await Product.findById(product._id)
      .populate("CatalogBaths")
      .populate("catalogPrice")
      .populate("catalogBed");

    res.json(populatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Delete main image and room images from Cloudinary
    await deleteFromCloudinary(product.mainRoomImg);
    for (const imgUrl of product.roomImgs) {
      await deleteFromCloudinary(imgUrl);
    }

    // Delete product from database
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product and images deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
