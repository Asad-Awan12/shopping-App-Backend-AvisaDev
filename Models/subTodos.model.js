import mongoose from "mongoose";

const subTodosSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    isComplete:{
        type:Boolean,
        default:false
    },
    auther:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    todoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo"
    }
},{timestamps:true});

const subTodo = mongoose.model("subTodo",subTodosSchema);
export{
    subTodo
}