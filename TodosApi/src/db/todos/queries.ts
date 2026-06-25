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

export async function createTodo(task: string) {
  const todo = new TodoModel({
    task: task,
    isDone: false,
    createdAt: Date.now(),
  });
  await todo.save();
  return {
    id: todo._id,
    task: todo.task,
    isDone: todo.isDone,
    createdAt: todo.createdAt,
  };
}
