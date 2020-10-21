const { Schema, model } = require("mongoose");

const TodoSchema = new Schema({
  value: {
    type: String,
    required: [true, "TODO Value is Required"],
    trim: true,
  },
  done: { type: Boolean, required: true, default: false },
  isEditing: { type: Boolean, required: true, default: false },
});

module.exports = model("Todo", TodoSchema);
