import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MONGO_URL, PORT } from "./constants";
import todosRouter from "./routes/todos";

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/todos", todosRouter);

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
