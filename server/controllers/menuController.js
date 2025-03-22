const mongoose = require("mongoose");

const MenuItem = require("../models/menuItemModel");
const cloudinaryInstance = require("../config/cloudinary");
const Restaurant = require("../models/restaurantModel");

//create Menu items
exports.createMenuItem = async (req, res) => {
  try {
    const { name, price, category, isAvailable,description,image } = req.body;
    const restaurantId = req.params.restaurantId.trim();

   const restaurant = await Restaurant.findById(restaurantId);

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID format." });
    }

  
    let imageUrl = "https://example.com/default-image.jpg"; 

   
    if (req.file) {
      const uploadResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      imageUrl = uploadResponse.url; 
    }

  
    const menuItemIsExist = await MenuItem.findOne({
      restaurant: restaurantId,
      name: name,
    });
    if (menuItemIsExist) {
      return res.status(400).json({ message: "Menu item already exists" });
    }

    const menuItem = new MenuItem({
      name,
      price,
      category,
      restaurant: restaurantId,
      isAvailable,
      description,
      image: imageUrl,
    });


    await menuItem.save();
    restaurant.menuItems.push(menuItem._id);
    await restaurant.save();

    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//byName-all hotel items
exports.getMenuItemsByName = async (req, res) => {
  try {
    const name = req.params.name;
    const menuItems = await MenuItem.find({
      name: { $regex: name, $options: "i" }, 
    });

    if (menuItems.length === 0) {
      return res.status(404).json({ message: "No menu items found." });
    }
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//menu in that restaurant
exports.getMenuItemByIdInRestaurant = async (req, res) => {
  try {
    const { menuItemId, restaurantId } = req.params;
    const menuItem = await MenuItem.findOne({
      _id: menuItemId,
      restaurant: restaurantId,
    });

    if (!menuItem) {
      return res
        .status(404)
        .json({ message: "Menu item not found in the specified restaurant." });
    }

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get-Resturant-all-menu
exports.getMenuItemsByRestaurant = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({
      restaurant: req.params.restaurantId,
    }).populate("menuItem");
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.updateMenuItem = async (req, res) => {
  try {
    const { menuItemId, restaurantId } = req.params;
    const { name, price, category, isAvailable } = req.body;

    let updateFields = { name, price, category, isAvailable };

    if (req.file) {
      const uploadResponse = await cloudinaryInstance.uploader.upload(
        req.file.path
      );
      updateFields.imageUrl = uploadResponse.url;
    }

    const menuItem = await MenuItem.findOneAndUpdate(
      { _id: menuItemId, restaurant: restaurantId },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!menuItem) {
      return res
        .status(404)
        .json({ message: "Menu item not found in the specified restaurant." });
    }

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.deleteMenuItem = async (req, res) => {
  try {
    const { menuItemId, restaurantId } = req.params;

    if (!menuItemId) {
      return res.status(400).json({ message: "Menu item ID is required" });
    }
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const menuItemIndex = restaurant.menuItems.indexOf(menuItemId);
    if (menuItemIndex === -1) {
      return res.status(404).json({ message: "Menu item not found in the specified restaurant" });
    }
    restaurant.menuItems.splice(menuItemIndex, 1);
    await restaurant.save(); 
    const deletedMenuItem = await MenuItem.findByIdAndDelete(menuItemId);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: "Menu item deleted from restaurant and MenuItem collection" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
