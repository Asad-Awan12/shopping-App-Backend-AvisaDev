import mongoose from "mongoose";

const orderSchema = {
  buyer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },
  location: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  orderstatus: {
    type: String,
    default: "pending",
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  shippingcharges: {
    type: Number,
    default: 50,
  },
  orderTitle: {
    type: String,
  },
  orderPrice: {
    type: Number,
    requried: true,
  },
  discountedprice: {
    type: Number,
    default: 0,
  },
  totalprice: {
    type: Number,
    required: true,
  },
};

export const Order = mongoose.model("Order", orderSchema);