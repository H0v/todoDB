const { Router } = require("express");
const router = Router();
const {
  getAllTodos,
  addTodo,
  editTodo,
  deleteTodo,
  saveTodo,
  checkTodo,
} = require("../controllers/todo.controllers");

router.route("/api/todos").get(getAllTodos).post(addTodo);

router.route("/api/todo/edit/:id").put(editTodo);

router.route("/api/todos/:id").delete(deleteTodo).put(saveTodo);

router.route("/api/todo/check/:id").put(checkTodo);
module.exports = router;
