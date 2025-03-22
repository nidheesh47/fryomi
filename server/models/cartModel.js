const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    restaurantId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Restaurant",
      required:true,
    },
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true,
        },
        
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        totalItemPrice: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    finalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    cartStatus:{
      type: String,
    }
  },

  { timestamps:true }
);

cartSchema.method.calulateTotalPrice = function(){
  this.totalPrice = this.items.reduce((total,items)=> total + items.price,0);
}

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;