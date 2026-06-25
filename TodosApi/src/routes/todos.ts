import { Router, Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  finishTodo,
  getAllTodos,
  undoTodo,
} from "../db/todos/queries";

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

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedTodo = await deleteTodo(id as string);
    res.json(deletedTodo);
  } catch (error) {
    res.status(404).json({ error: "Todo not found" });
  }
});

router.patch("/:id/finish", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const finishedTodo = await finishTodo(id as string);
    res.json(finishedTodo);
  } catch (error) {
    res.status(404).json({ error: "Todo not found" });
  }
});

router.patch("/:id/undo", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const undoneTodo = await undoTodo(id as string);
    res.json(undoneTodo);
  } catch (error) {
    res.status(404).json({ error: "Todo not found" });
  }
});

export default router;
