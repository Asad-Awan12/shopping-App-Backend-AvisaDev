import { isValidObjectId } from "mongoose";
import { subTodo } from "../Models/subTodos.model.js";
import { Todo } from "../Models/todos.models.js";

const sub_Todo = async (req, res) => {
  let id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: "ID is not valid" });
  }
  try {
    const { content, isComplete, auther, TodoId } = req.body;
    if ([content].some((field) => field.trim === "")) {
      return res.status(401).json({ message: "All fields are required" });
    }
    let mainTodo = await Todo.findOne({ _id: id });
    console.log("mainTodo ", mainTodo);

    // let userFind = await User.findOne({_id:id})
    const subTodos = await subTodo.create({
      content,
      isComplete: false,
      auther: mainTodo?.auther,
      todoId: mainTodo?._id,
    });
    return res
      .status(201)
      .json({ message: "Sub Todo Created Successfully", subTodos });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Error in Creating Sub todo" });
  }
};

const getAll_sub = async (req, res) => {
  let { todoId,search} = req.body;
  const { page = 1, limit = 6 } = req.query;
  let query={todoId:todoId}
  if (search!==undefined)  {
    query.isComplete=search
  }
  
  try {
    const skip = (page - 1) * limit;
    const data = await subTodo.find(query).skip(skip).limit(limit);
    
    const total = await subTodo.countDocuments(data);
    console.log("total ",total);
    
    const totalPages = Math.ceil(total / limit);
      return res
      .status(201)
      .json({
        message: "Fetch All Todo data Successfully",
        data,
        page,
        totalPages,
        total,
      });
    
   
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Error in fetching data" });
  }
};

const del_Sub_Todos = async (req, res) => {
  try {
    const { id } = req.params;
    const sub_todo_delete = await subTodo.findByIdAndDelete({ _id: id });
    return res
      .status(201)
      .json({ message: "Successfully Delete Sub-Todo Item", sub_todo_delete });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Error in Delete Sub-Todo Item" });
  }
};

const update_Sub_Todos = async (req, res) => {
  const { id } = req.params;
  let { content, isComplete } = req.body;
  try {
    const update_Sub_Todo = await subTodo.findByIdAndUpdate(
      id,
      {
        content,
        isComplete,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    const sub_Todo = await subTodo.find();

    const comp = sub_Todo.map((i) => i);
    // console.log("sub_Todo ",sub_Todo);
    // console.log("comp ",comp);
    const todo = await Todo.findOne({ todoId: comp?.todoId });
    let value = true;
    if (comp.every((val) => val?.isComplete === value)) {
      todo.isCompleted = true;
    } else {
      todo.isCompleted = false;
    }
    todo.save();

    return res
      .status(201)
      .json({ message: "Update Sub Todo Successfully!!", update_Sub_Todo });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Error in Updating Sub Todo!!" });
  }
};

// getsub Todod by task


export { sub_Todo, getAll_sub, del_Sub_Todos, update_Sub_Todos };
