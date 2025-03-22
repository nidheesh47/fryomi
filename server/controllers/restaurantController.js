const mongoose = require("mongoose");

const cloudinaryInstance = require("../config/cloudinary");
const Restaurant = require("../models/restaurantModel");
const MenuItem = require("../models/menuItemModel");

exports.createRestaurant = async (req, res) => {
  try {
    const { name, location, cuisine, status, contact } = req.body;

    if (!name || !cuisine) {
      return res.status(400).json({ message: "all fields required" });
    }
    //clodinaryupload
    console.log("req.file",req.file);
    let imageUrl;
    if (req.file) {
      const uploadResponse = await cloudinaryInstance.uploader.upload(
        req.file.path
      );
      imageUrl = uploadResponse.url;
      console.log(imageUrl);
      
    }
    let restaurant = await Restaurant.findOne({ name });
    if (restaurant)
      return res.status(400).json({ message: "Restaurant already exists" });

    restaurant = new Restaurant({
      name,
      location,
      cuisine,
      owner: req.user.userId,
      image: imageUrl,
      contact,
    });

    await restaurant.save();

    res.status(201).json(restaurant);
  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: error.message });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const { search, cuisine } = req.query;
    console.log(cuisine);
    
    const filterObject = {};
    if (search) {
      filterObject.name = { $regex: search, $options: "i" }; 
    }
    if (cuisine && cuisine.toLowerCase() !== "all") {
      filterObject.cuisine = { $regex: `^${cuisine}$`, $options: "i" };
    }
    
    
    const restaurants = await Restaurant.find(filterObject);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(
      req.params.restaurantId
    ).populate("menuItems");
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    let imageUrl = restaurant.image; 
    if (req.file) {
      const uploadResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      imageUrl = uploadResponse.url; 
    }
    Object.assign(restaurant, { ...req.body, image: imageUrl });
    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(
      req.params.restaurantId
    );

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "Restaurant not found or unauthorized" });
    }

    await MenuItem.deleteMany({ _id: { $in: restaurant.menuItems } });
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
