import { User } from "../Models/user.models.js"

const isAdmin = async(req,res,next)=>{
      const id = req.params.id;
    try {
        let user = await User.findOne({_id:id});
        console.log("user ",user);

        if (user?.isAdmin !== true) {
            return res.status(501).json({message:"User is not Admin"})
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(404).json({message:"Error in checking isAdmin"})
    }
}
export{
    isAdmin
}