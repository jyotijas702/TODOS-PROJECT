import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { MONGO_URL, PORT } from "./constants";
import { TodoModel } from "./db/todo";

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express with TypeScript!" });
});

app.get("/todos", async (req: Request, res: Response) => {
  const todos = await TodoModel.find({}).select([
    "task",
    "isDone",
    "createdAt",
  ]);
  res.json(todos);
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
