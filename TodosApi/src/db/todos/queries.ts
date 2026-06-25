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

export async function deleteTodo(id: string) {
  const result = await TodoModel.findByIdAndDelete(id);
  if (!result) {
    throw new Error("Todo not found");
  }
  return {
    id: result._id,
    task: result.task,
    isDone: result.isDone,
    createdAt: result.createdAt,
  };
}

export async function finishTodo(id: string) {
  const result = await TodoModel.findByIdAndUpdate(
    id,
    { isDone: true },
    { new: true },
  );
  if (!result) {
    throw new Error("Todo not found");
  }
  return {
    id: result._id,
    task: result.task,
    isDone: result.isDone,
    createdAt: result.createdAt,
  };
}

export async function undoTodo(id: string) {
  const result = await TodoModel.findByIdAndUpdate(
    id,
    { isDone: false },
    { new: true },
  );
  if (!result) {
    throw new Error("Todo not found");
  }
  return {
    id: result._id,
    task: result.task,
    isDone: result.isDone,
    createdAt: result.createdAt,
  };
}
