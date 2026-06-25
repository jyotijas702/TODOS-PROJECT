import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { MONGO_URL, PORT } from "./constants";

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express with TypeScript!" });
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
