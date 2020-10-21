const Todo = require("../models/todo.model");
const asyncWrapper = require("../middleware/asyncWrapper");
// const customError = require("../helper/customError");
const { idValidation, isTodo } = require("../helper/validation");

exports.getAllTodos = asyncWrapper(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({ todos: todos });
});

exports.addTodo = asyncWrapper(async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(200).json({ success: true });
});

exports.editTodo = asyncWrapper(async (req, res) => {
  idValidation(req);
  const todo = await Todo.findById(req.params.id);
  isTodo(todo);
  await Todo.updateOne({ _id: req.params.id }, { $set: { isEditing: true } });
  await Todo.updateMany(
    { _id: { $ne: req.params.id } },
    { $set: { isEditing: false } }
  );
  res.status(200).json({ success: true });
});

exports.deleteTodo = asyncWrapper(async (req, res) => {
  idValidation(req);
  const todo = await Todo.findById(req.params.id);
  isTodo(todo);
  await Todo.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true });
});

exports.saveTodo = asyncWrapper(async (req, res) => {
  idValidation(req);
  const todo = await Todo.findById(req.params.id);
  isTodo(todo);
  if (req.body.value.trim() === "") {
    await Todo.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Deleted due to empty input" });
  } else {
    await Todo.updateOne(
      { _id: req.params.id },
      { $set: { value: req.body.value, isEditing: false } }
    );
    res.status(200).json({ success: true });
  }
});

exports.checkTodo = asyncWrapper(async (req, res) => {
  idValidation(req);
  const todo = await Todo.findById(req.params.id);
  isTodo(todo);
  await Todo.updateOne({ _id: req.params.id }, { $set: { done: !todo.done } });
  res.status(200).json({ success: true });
});
