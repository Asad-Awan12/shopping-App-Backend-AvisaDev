import { Router } from "express";
import { delete_todo, getAll, post_todo, update } from "../Controllers/todo.controller.js";
import { del_Sub_Todos, getAll_sub, sub_Todo, update_Sub_Todos, } from "../Controllers/subTodos.controller.js";
const Todorouter = Router();

Todorouter.route('/mainTodo/:id').post(post_todo)
Todorouter.route('/subTodo/:id').post(sub_Todo)
Todorouter.route('/update-todo/:id').post(update)
Todorouter.route('/update-sub-todo/:id').post(update_Sub_Todos)
Todorouter.route('/delete/:id').post(delete_todo)
Todorouter.route('/delete-sub-todo/:id').post(del_Sub_Todos)
Todorouter.route('/getAll/:id').get(getAll)
Todorouter.route('/getAllSub').get(getAll_sub)

export {
    Todorouter
}