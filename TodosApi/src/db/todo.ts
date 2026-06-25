import mongoose, { Schema } from "mongoose";
import { Todo } from "../types/todo";

const todoSchema = new Schema<Todo>({
  task: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const TodoModel = mongoose.model<Todo>("Todo", todoSchema);
