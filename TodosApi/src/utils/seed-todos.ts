import mongoose from "mongoose";
import { TodoModel } from "../db/todo";
import { MONGO_URL } from "../constants";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const addTodo = async () => {
  const res = await TodoModel.insertMany([
    { task: "Do Yoga", isDone: true, createdAt: Date.now() },
    { task: "Drink Water", isDone: true, createdAt: Date.now() },
    { task: "Practice Guitar", isDone: false, createdAt: Date.now() },
    { task: "Learn new language", isDone: false, createdAt: Date.now() },
  ]);
  console.log(res);
};

addTodo().then(() => {
  console.log("Todos Seeded...");
});
