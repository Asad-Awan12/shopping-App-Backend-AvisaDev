import { Product } from "../Models/Product.model.js";
import { Review } from "../Models/review.model.js";
import { Shop } from "../Models/shop.model.js";
import { User } from "../Models/user.models.js";

const createProduct = async (req, res) => {
  let { id } = req.params;
  let { productName, description, price, category, discountprice } = req.body;
  try {
    if (
      [productName, description, price, category, discountprice].some(
        (field) => field.trim === ""
      )
    ) {
      return res.status(501).json({ message: "All fields are required" });
    }
    const shop = await Shop.findOne({_id:id});
    const user = await User.findOne({_id:shop?.userId})
    if (!user) {
        return res.status(201).json({message:"Only Shop Owner Create Products"})
    }
    if (!shop) {
        return res.status(201).json({message:"Shop d'nt found!! Please Create Shop First"})
    }
    const create_Product = await Product.create({
      shopId: id,
      productName,
      description,
      price,
      category,
      discountprice,
    });
    return res
      .status(201)
      .json({ message: "Successfully created create_Shop", create_Product });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Error in creating create_Shop" });
  }
};

const getAllProducts = async (req, res) => {
  let { id } = req.body;
  const { page = 1, limit = 6, category, productName } = req.query;
  let query = { shopId: id };
  if (category) {
    query.category = category;
  }
  if (productName) {
    query.productName = productName;
  }

  try {
    const skip = (page - 1) * limit;

    const data = await Product.find(query).skip(skip).limit(limit);
    console.log("data ", data);

    const total = await Product.countDocuments(data);
    const totalPages = Math.ceil(total / limit);

    return res.status(201).json({
      message: "Successfully Fetching All Shop Products",
      data,
      page,
      totalPages,
      total,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Error in Fetching All Shop Products" });
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 2 } = req.query;
  try {
    let product_find = await Product.findOne({_id:id})
    if (!product_find) {
        return res.status(501).json({message:"Product d'nt found!! Create Product First"})
    }
    const skip = (page - 1) * limit;
    const review = await Review.find({ productId: id }).skip(skip).limit(limit);
    const total = await Review.countDocuments(review);
    const totalPages = Math.ceil(total / limit);
    return res
      .status(501)
      .json({
        message: "Successfully Fetching Single Product",
        review,
        page,
        totalPages,
        total,
      });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Error in Fetching Single Product" });
  }
};
const updateProduct = async(req,res)=>{
  let {id} = req.params;
  let {shopId,productName,description,price,category,discountprice} = req.body
  try {
    const product = await Product.findOne({_id:id})
    if (product?.shopId.toString() !== shopId) {
      res.status(501).json({ message: "Only Owner Can Update Product"}); 
    }
    const update_Product = await Product.findByIdAndUpdate(
      id,
      {
        productName,
        description,
        price,
        category,
        discountprice
      },
      { new: true, runValidators: true }
    )
    return res.status(501).json({message:"Successfully Updating Products",update_Product})
  } catch (error) {
    console.log(error);
    return res.status(501).json({message:"Error in Updating Products"})
  }
}
export { createProduct, getAllProducts, getSingleProduct ,updateProduct};
