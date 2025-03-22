const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, default:"https://cdn-icons-png.flaticon.com/512/2439/2439116.png" },
    quantity: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    customerReviews: [{ type:String }],
    restaurant: { type: String},
    isAvailable: { type: Boolean, default: true }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports  = MenuItem