const Todo = require("../models/todo.model");
const errorHandler = require("../middleware/errorHandler");

exports.getAllTodos = errorHandler(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({ todos: todos });
});

exports.addTodo = errorHandler(async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(200).json({ success: true });
});

exports.editTodo = errorHandler(async (req, res) => {
  try {
    const todo = await Todo.find({ _id: req.body.id });
  } catch (err) {
    throw new Error("Todo Not Found");
  }
  await Todo.updateOne({ _id: req.params.id }, { $set: { isEditing: true } });
  await Todo.updateMany(
    { _id: { $ne: req.params.id } },
    { $set: { isEditing: false } }
  );
  res.status(200).json({ success: true });
});

exports.deleteTodo = errorHandler(async (req, res) => {
  const todo = await Todo.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true });
});

exports.saveTodo = errorHandler(async (req, res) => {
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

exports.checkTodo = errorHandler(async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });
  await Todo.updateOne({ _id: req.params.id }, { $set: { done: !todo.done } });
  res.status(200).json({ success: true });
});
