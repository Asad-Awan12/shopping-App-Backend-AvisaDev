import { isValidObjectId } from "mongoose";
import { Pref } from "../Models/prefrence.model.js";

const createPref = async(req,res)=>{
    // let {id} = req.params;
    console.log(req?.body);
    
    let {age ,gender,interest,username,userId} = req.body
    try {
      if (!isValidObjectId(userId)) {
      return res.status(501).json({ message: "Invalid Id" }); 
      }
         if (
      [ gender, interest,username].some(
        (field) => field.trim === ""
      )
    ) {
      return res.status(501).json({ message: "All fields are required" });
    }
    if(!age){
       return res.status(404).json({message:"age is required"})
    }
    if (!userId) {
      return res.status(404).json({message:"UserId is required"})
    }
    const findPref_User = await Pref.findOne({userId})
    console.log("findPref_User ",findPref_User);
    
    
    if (findPref_User?.userId.toString() === userId) {
        return res.status(501).json({message:"User cannot genrate more than One Pref"})
    }
    
    let profile = req?.file?.path;
    const createPref = await Pref.create({
        userId,
        age,
        gender,
        interest,
        profile,
        username
    })
    console.log("createPref ",createPref);
    
    return res.status(201).json({createPref})
    } catch (error) {
        console.log(error);
      return  res.status(404).json({message:"Error in creating createPref"})
    }
}
export{
    createPref
}