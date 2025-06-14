import { subTodo } from "../Models/subTodos.model.js";
import { Todo } from "../Models/todos.models.js";

const post_todo = async (req, res) => {
  let id = req.params.id;
  try {
    const { title, content, isCompleted, auther } = req.body;
    if ([title, content].some((field) => field.trim === "")) {
      return res.status(501).json({ message: "All fields are required" });
    }

    const todo = await Todo.create({
      title,
      content,
      isCompleted: false,
      auther: id,
    });

    if (!todo) {
      return res
        .status(201)
        .json({ message: "Todo does not create Successfully" });
    }

    return res.status(201).json({ message: "Todo create successfully", todo });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Todo does not create Successfully" });
  }
};

const getAll = async (req, res) => {
  const {id} = req.params;
  try {
    const todos = await Todo.find({auther:id});
    return res
      .status(201)
      .json({ message: "Fetch All Todo data Successfully", todos });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Error in fetching data" });
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  const {title,content} = req.body
  try {
  const findTodo = await Todo.findOne({_id:id});
  if (title === '') {
    return res.status(404).json({message:"Todo title is not Found!!"})
  }
   if (content === '') {
    return res.status(404).json({message:"Todo Content is not Found!!"})
  }
  findTodo.title = title,
  findTodo.content = content
  findTodo.save();
    // const { title, content } = req.body;
    // const update_todo = await Todo.findByIdAndUpdate(
    //   id,
    //   {
    //     title,
    //     content,
    //   },
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );
    // if (!update_todo) {
    //   return res.status(401).json({ message: "Error in updating" });
    // }
    return res
      .status(201)
      .json({ message: "Updating data Successfully", findTodo });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Error in updating" });
  }
};

const delete_todo = async (req, res) => {
  let id = req.params.id;
  // let { todoId,_id } = req.body;
  try {
    // console.log("todoId ",todoId);

    // let sub_id = await subTodo.find();
    // let main_todo = await Todo.find();
    // console.log("main_todo ",main_todo);
    // let mainTodo = main_todo.map(async(i)=>{
    //   // return i._id
    //   return await subTodo.findOneAndDelete({todoId:i._id})
    // })
    // console.log("mainTodo ",mainTodo);

    // console.log("sub_id", sub_id);
    // const d = sub_id?.map((i) => {
    //   return i.todoId

    // });

    //    let sub_id_2 = await subTodo.find({d});
    // console.log("ids ", d.toString());
    //  console.log("ids ", sub_id_2);

    // Delete Sub Todo One by One
    //  var data = await subTodo.findOneAndDelete({
    //   _id:{
    //     $in:sub_id_2
    //   }
    //  });

    // const a = mainTodo.map((i)=>i._id).includes(d)
    // const data1 = await subTodo.findOneAndDelete(a)

    // Method 1
    // const data = await subTodo.deleteMany(todoId)

    // Method -2
    //  const data =   await subTodo.deleteMany({
    // _id: {
    //   $in: d;
    // }
    //  })

    // const todo = await Todo.find({todoId})
    //  var data = await subTodo.findById(d);
//  const todos = await subTodo.find({todoId:id}).populate('todoId');
    // Method 3
    // for (const d of id) {
    //   console.log("dd ", id.todoId);
    //   console.log("dd ", id._id);
    //   var data = await Todo.findByIdAndDelete(id);
    //   if (!data) {
    //     await subTodo.findByIdAndDelete({todoId:id})
    //     // await subTodo.deleteMany({
    //     //   todoId: {
    //     //     $in: id?.todoId,
    //     //   },
    //     // });
    //   }
    // }
    // console.log("data ", data1);

    //  const  data = await subTodo.findByIdAndDelete(sub_id);


      let all_Sub = await subTodo.find({todoId:id});
      console.log("all_Sub ",all_Sub);
      let sub_ids = all_Sub.map((i)=>i._id)
      console.log("sub_ids ",sub_ids);
      
      let data = await Todo.findByIdAndDelete(id);
      for (const key of sub_ids) { 
      // if (!data) {
        await subTodo.findByIdAndDelete({_id:key})
      // }
      }
      
      // var data = await Todo.findByIdAndDelete(id);
      // if (!data) {
      //   await subTodo.findByIdAndDelete({todoId:id})
      // }


      // Method-4 Delete main todo and delete sub todos one by one
    // let main_todo = await Todo.find({ _id });
    // console.log("main_todo ", main_todo);
    // const findSubTodo = await subTodo.find({todoId});
    // console.log("findSubTodo ", findSubTodo);
    // let sub_id;
    // findSubTodo.map((i) => (sub_id = i.todoId));
    // let deleteTodo = await subTodo.findOneAndDelete({todoId:todoId});
    // for (const id of findSubTodo) {

    // }

    // console.log("main_todo ",main_todo);
    // let mainTodo = main_todo.map(async(i)=>{
    //   // return i._id
      // return await subTodo.findOneAndDelete({todoId:i._id})
    // })
    // console.log("mainTodo ", main_todo);
    // console.log("delateTodo ", deleteTodo);
    return res
      .status(201)
      .json({ message: "deleting data Successfully",data});
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Error in deleting" });
  }
};

export { post_todo, getAll, update, delete_todo };
