const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        type: String,
      },
    cuisine: { type: String, required: true },
    rating: { type: Number, default: 0 },
    menuItems: [{ type: mongoose.Schema.Types.ObjectId,ref:"MenuItem"}],
    contact: {
        phone: String,
        email: String
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    owner: { type:String}, 
    createdAt: { type: Date, default: Date.now },
    image:{
        type:String,
    },
   
    
});

restaurantSchema.index({ "address.location": "2dsphere" });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant