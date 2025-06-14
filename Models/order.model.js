import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    location: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    orderStatus: {
      type: String,
      default: "pending",
    },
    shippingcharges: {
      type: Number,
      default: 50,
    },
    orderTitle: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export { Order };
