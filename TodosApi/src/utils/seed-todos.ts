import mongoose from "mongoose";
import { TodoModel } from "../db/todo";
import { MONGO_URL } from "../constants";

mongoose
  .connect(MONGO_URL)
  .then(async () => {
    console.log("DB Connected");
    await TodoModel.insertMany([
      { task: "Do Yoga", isDone: true, createdAt: Date.now() },
      { task: "Drink Water", isDone: true, createdAt: Date.now() },
      { task: "Practice Guitar", isDone: false, createdAt: Date.now() },
      { task: "Learn new language", isDone: false, createdAt: Date.now() },
    ]);
    console.log("Todos Seeded...");
  })
  .catch(console.error)
  .finally(() => {
    mongoose.disconnect();
    process.exit(0);
  });
