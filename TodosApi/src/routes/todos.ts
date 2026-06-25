import { Router, Request, Response } from "express";
import { getAllTodos } from "../db/queries";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.json(await getAllTodos());
});

export default router;
