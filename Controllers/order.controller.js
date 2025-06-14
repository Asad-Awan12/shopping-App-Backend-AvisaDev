import { isValidObjectId } from "mongoose";
import { Product } from "../Models/Product.model.js";
import { Shop } from "../Models/shop.model.js";
import { User } from "../Models/user.models.js";
import { Order } from "../Models/order.model.js";

let multipleOrder = [];
const orderCreate = async (req, res) => {
  let {
    userId,
    productId,
    shopId,
    location,
    phoneNumber,
    quantity,
    orderStatus,
    shippingcharges,
    orderTitle,
    orderPrice,
    discountedprice,
    totalprice,
  } = req.body;
  try {
    const shop = await Shop.findOne({ _id: shopId });
    console.log("shop ", shop?.userId.toString());

    const product = await Product.findOne({ _id: productId });
    console.log("product ", typeof product?.price);
    console.log("product ", typeof product?.discountprice);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(501).json({ message: "User doest not found!!" });
    }
    if (!shop) {
      return res.status(501).json({ message: "Shop doest not found!!" });
    }
    if (!product) {
      return res.status(501).json({ message: "Product doest not found!!" });
    }
    // find Shop
    if (shop?.userId.toString() == userId) {
      return res
        .status(501)
        .json({ message: "Shop owner cannot buy its own Product" });
    }
    let order_price = (product?.price - product?.discountprice) * quantity;
    console.log("order_price ", order_price);
    console.log("quantity ", quantity);
    console.log("quantity ", typeof quantity);
    console.log("order_price ", typeof order_price);
    let discount_price = product?.price - product?.discountprice;

    // const order =  await Order.find({productId:productId});
    // let order_quantity = (order ?? []).find((item) => item?.productId.toString() == productId);
    // console.log("order_quantity",order_quantity);

    // if (order_quantity) {
    //     order_quantity.quantity++
    // }

    // console.log("order_quantity updated ",order_quantity);

    let create_Order = await Order.create({
      userId,
      shopId,
      productId,
      ownerId: shop?.userId.toString(),
      location,
      orderTitle: product?.productName,
      discountedprice: discount_price,
      totalprice: order_price + shippingcharges,
      phoneNumber,
      quantity,
      orderPrice: order_price,
      orderStatus,
      shippingcharges,
    });
    let order = await Order.find()
    order.map((i)=>{
        if (i?.shopId.toString() == shop?._id.toString()) {
            multipleOrder.push(i)
        }
    })
   
    
    // if (shop?._id) {
        
    // }
    // let shop = await Shop.find();
    // if (order_quantity) {
    //    create_Order = order_quantity?.save()
    // }
    return res
      .status(201)
      .json({ message: "Shop created Successfully", multipleOrder });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Error in creating Order" });
  }
};

const getAll_ShopOrder = async (req, res) => {
  let { id } = req.params;

  try {
    let shop = await Shop.findOne({ userId: id });
    if (id != shop?.userId.toString()) {
      return res
        .status(404)
        .json({ message: "Shop doest not Found with this Id" });
    }
    let user = await User.findOne({ _id: id });
    if (id != user?._id.toString()) {
      return res
        .status(404)
        .json({ message: "User doest not Found with this Id" });
    }
    const owner = await Order.find({ ownerId: id });
    console.log("owner ", owner);
    return res
      .status(201)
      .json({ message: "Owner Successfully Fething its Order", owner });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ message: "Error in Fetching all Shop Order by Owner" });
  }
};
const getAll_UserOrder = async (req, res) => {
  let { id } = req.params;

  try {
    let shop = await Shop.findOne({ userId: id });
    if (id != shop?.userId.toString()) {
      return res
        .status(404)
        .json({ message: "Shop doest not Found with this Id" });
    }
    let user = await User.findOne({ _id: id });
    if (id != user?._id.toString()) {
      return res
        .status(404)
        .json({ message: "User doest not Found with this Id" });
    }
    const user_all = await Order.find({ userId: id });
    return res
      .status(201)
      .json({ message: "User Successfully Fething its Order", user_all });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ message: "Error in Fetching all Shop Order by User" });
  }
};
const updateStatus = async (req, res) => {
  let { status, userId } = req.body;
  let { id } = req.params;
  try {
    let shop = await Shop.findOne({ userId: userId });
    if (userId != shop?.userId.toString()) {
      return res
        .status(404)
        .json({ message: "Shop doest not Found with this Id" });
    }
    let user = await User.findOne({ _id: userId });
    if (userId != user?._id.toString()) {
      return res
        .status(404)
        .json({ message: "User doest not Found with this Id" });
    }
    // if orderid isEqual to params id
    let status_update = await Order.findOne({ _id: id });
    status_update.orderStatus = status;
    return res
      .status(501)
      .json({ message: "Successfully Updating Status", status_update });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Error in Updating Status" });
  }
};

export { orderCreate, getAll_ShopOrder, getAll_UserOrder, updateStatus };
