import { TodoModel } from "./todo";

export async function getAllTodos() {
  const todos = await TodoModel.find({}).select([
    "task",
    "isDone",
    "createdAt",
  ]);
  return todos.map((todo) => {
    return {
      id: todo._id,
      createdAt: todo.createdAt,
      task: todo.task,
      isDone: todo.isDone,
    };
  });
}
