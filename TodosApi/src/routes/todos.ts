import { Router, Request, Response } from "express";
import { createTodo, getAllTodos } from "../db/todos/queries";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.json(await getAllTodos());
});

router.post("/", async (req: Request, res: Response) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }
  const newTodo = await createTodo(task);
  res.status(201).json(newTodo);
});

export default router;
