import { Pref } from "../Models/prefrence.model.js";

const createPref = async(req,res)=>{
    let {id} = req.params;
    let {age,gender,location,interest,education} = req.body
    try {
         if (
      [age, gender, location, interest,education].some(
        (field) => field.trim === ""
      )
    ) {
      return res.status(501).json({ message: "All fields are required" });
    }
    if(!age){
       return res.status(404).json({message:"age is required"})
    }

    const findPref_User = await Pref.findOne({userId:id})
    
    if (findPref_User?.userId.toString() === id) {
        return res.status(501).json({message:"User cannot genrate more than One Pref"})
    }
    

    const createPref = await Pref.create({
        userId:id,
        age,
        gender,
        location,
        interest,
        education
    })
    return res.status(201).json({message:"Successfully created createPref",createPref})
    } catch (error) {
        console.log(error);
      return  res.status(404).json({message:"Error in creating createPref"})
    }
}
export{
    createPref
}