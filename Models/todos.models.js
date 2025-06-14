import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content:{
      type:String,
      required:true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    auther: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // subTodos:[
    //   {
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"subTodo"
    //   }
    // ]
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);
export { Todo };
