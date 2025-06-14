import { Product } from "../Models/Product.model.js";
import { Shop } from "../Models/shop.model.js";
import { User } from "../Models/user.models.js";

const createShop = async (req, res) => {
  let { id } = req.params;
  let { shopName, description } = req.body;
  try {
    if ([shopName, description].some((field) => field.trim === "")) {
      return res.status(501).json({ message: "All fields are required" });
    }
    const user = await User.findOne({_id:id})
    if (!user) {
      return res.status(501).json({message:"User d'nt found!!"})
    }
    const shop = await Shop.findOne({_id:id});
    if (user?.id.toString() == shop?.userId) {
        return res.status(501).json({message:"User alredy have a shop"})
    }
    const create_Shop = await Shop.create({
      userId: id,
      shopName,
      description,
    });
    return res
      .status(201)
      .json({ message: "Successfully created create_Shop", create_Shop });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Error in creating create_Shop" });
  }
};

const deleteShop = async (req, res) => {
  let {email,password,userId} = req.body
  let { id } = req.params;

  try {
     const shop = await Shop.findOne({_id:id});
    if (!shop) {
        return res.status(201).json({message:"Shop d'nt found!! Please Create Shop First"})
    }
    const user = await User.findOne({_id:userId});
    console.log("user ",user);
    let comparePassword = await user.comparePassword(password)
    if (!comparePassword || user?.email !== email) {
      return res.status(501).json({ message: "Credential Error while Deleting" }); 
    }
    const del_Products = await Product.find({ shopId: id });
    console.log("del_Products ", del_Products);
    let del_User_Shop = await Shop.findByIdAndDelete({ _id: id });
    for (const key of del_Products) {
      console.log("key ", key);
      var del_All_Products = await Product.findByIdAndDelete({ _id: key?._id });
    }
    // console.log("del_Shop ",del_Shop);
    return res
      .status(201)
      .json({
        message: "Delete Data Successfully",
        del_User_Shop,
        del_All_Products,
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Error in deleting Products" });
  }
};

const getAllShop = async(req,res)=>{
  const { page = 1, limit = 2 } = req.query;
  try {
     const skip = (page - 1) * limit;
    const shop = await Shop.find().skip(skip).limit(limit);
    const total = await Shop.countDocuments(shop);
    const totalPages = Math.ceil(total / limit);
    return res
      .status(501)
      .json({
        message: "Successfully Fetching Single Product",
        shop,
        page,
        totalPages,
        total,
      });
  } catch (error) {
    console.log(error);
   return res.status(501).json({message:"Error in Fetching All Shops"})
  }
}

export { createShop, deleteShop,getAllShop };
