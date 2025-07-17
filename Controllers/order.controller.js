import mongoose, { isValidObjectId } from "mongoose";
import { Product } from "../Models/Product.model.js";
import { Shop } from "../Models/shop.model.js";
import { User } from "../Models/user.models.js";
import { Order } from "../Models/order.model.js";

let multipleOrder = [];


const created_Order = async (req, res) => {
  try {
    const {
      buyer_id,
      location,
      phonenumber,
      quantity,
      shippingcharges,
      products_ids,
      orderstatus
    } = req.body;

    if (!buyer_id || !location || !phonenumber || !products_ids || products_ids.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isValid = mongoose.Types.ObjectId.isValid(buyer_id);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid buyer ID" });
    }

    const buyer = await User.findById(buyer_id);
    if (!buyer) {
      return res.status(400).json({ message: "Buyer does not exist" });
    }

    const products = await Product.find({ _id: { $in: products_ids } });
    if (products.length === 0) {
      return res.status(404).json({ message: "No valid products found" });
    }

    const shopGroups = {};
    for (const product of products) {
      // if (product.stock === 0) {
      //   return res.status(400).json({ message: `${product.productname} is out of stock` });
      // }

      if (product?.shopId?.toString() === buyer_id) {
        return res.status(400).json({ message: "Owner cannot order their own product" });
      }

      const shopId = product?.shopId?.toString();
      if (!shopGroups[shopId]) {
        shopGroups[shopId] = [];
      }
      shopGroups[shopId].push(product);
    }

    const createdOrders = [];

    for (const shopId in shopGroups) {
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return res.status(400).json({ message: `Shop with ID ${shopId} not found` });
      }

      let orderTotal = 0;
      let discountTotal = 0;
      let productIds = [];

      for (const product of shopGroups[shopId]) {
        const price = product.price * quantity;
        const discount = product.discountprice || 0;

        orderTotal += price;
        discountTotal += discount;

        // product.stock -= 1;
        await product.save();

        productIds.push(product._id); 
      }

      const finalTotal = orderTotal - discountTotal + shippingcharges;

      const order = await Order.create({
        orderTitle: `Order from shop ${shop.shopName}`,
        orderPrice: orderTotal,
        discountedprice: discountTotal,
        totalprice: finalTotal,
        buyeruser_id: buyer_id,
        shop_id: shop._id,
        location,
        phonenumber,
        orderstatus,
        products_ids: productIds, 
      });

      createdOrders.push({
        ...order.toObject(),
        products_ids: productIds,
      });
    }

    return res.status(200).json({
      message: "Order(s) created successfully",
      orders: createdOrders,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
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

export {  getAll_ShopOrder, getAll_UserOrder, updateStatus,created_Order };









































// const orderCreate = async (req, res) => {
//   let {
//     userId,
//     // productId,
//     shopId,
//     location,
//     phoneNumber,
//     quantity,
//     orderStatus,
//     shippingcharges,
//     orderTitle,
//     orderPrice,
//     discountedprice,
//     totalprice,
//   } = req.body;
//   try {
//     const shop = await Shop.findOne({ userId: userId });
//     console.log("shop ", shop);

//     const groupedByShop  = {};
//     const product  = await Product.find();
//     console.log("product ",  product);
//     // console.log("product ", typeof product);
//     const user = await User.findOne({ _id: userId });
//     if (!user) {
//       return res.status(501).json({ message: "User doest not found!!" });
//     }
//     if (!shop) {
//       return res.status(501).json({ message: "Shop doest not found!!" });
//     }
//     // if (!product) {
//     //   return res.status(501).json({ message: "Product doest not found!!" });
//     // }
//     for (const products of product) {
//   if (!groupedByShop[products.ownerId]) {
//     groupedByShop[products.ownerId] = [];
//   }
//   groupedByShop[products.ownerId].push(products);
// }

// const orders = [];





//     // let order_price = (product?.price - product?.discountprice) * quantity;
//     // console.log("order_price ", order_price);
//     // console.log("quantity ", quantity);
//     // console.log("quantity ", typeof quantity);
//     // console.log("order_price ", typeof order_price);
//     // let discount_price = product?.price - product?.discountprice;







// for (const products of Object.entries(groupedByShop)) {
//   // let orderPrice = 0;
//   // let shippingcharges = 50; // Example flat shipping per order

// let  productId = products.map((item) => {
//     // orderPrice += item.price * item.quantity;
//     return {
//       productId: item,
//       // quantity: item.quantity,
//       // price: item.price,
//     };
//   });
 
//     let create_Order = await Order.create({
//       userId,
//       shopId,
//       productId,
//       ownerId: shop?.userId.toString(),
//       location,
//       // orderTitle,
//       discountedprice,
//       // totalprice,
//       phoneNumber,
//       quantity,
//       // orderPrice,
//       orderStatus,
//       shippingcharges,
//     });

//       orders.push(create_Order);
// }



// //  let o =   order?.map((i)=>{
// //   if (findproductId?.shopId.toString() == i?.shopId.toString()) {
// //    return i?.productId.push(findproductId?._id)
// //   }
// //   if (findShopId?._id.toString() != i?.shopId.toString()) {
// //    return i?.productId.push(findproductId?._id)
// //   }
// //   // return {...i,productId:i?.productId.push(findproductId)} 
// //  })

//     // let order = await Order.find()
//     // order.map((i)=>{
//     //     if (i?.shopId.toString() == shop?._id.toString()) {
//     //         multipleOrder.push(i)
//     //     }
//     // })
   
    
//     // if (shop?._id) {
        
//     // }
//     // let shop = await Shop.find();
//     // if (order_quantity) {
//     //    create_Order = order_quantity?.save()
//     // }
//     // o.save()
//     return res
//       .status(201)
//       .json({ message: "Shop created Successfully", });
//   } catch (error) {
//     console.log(error);
//     return res.status(501).json({ message: "Error in creating Order" });
//   }
// };