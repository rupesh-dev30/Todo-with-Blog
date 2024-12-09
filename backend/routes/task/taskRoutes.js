import express from "express";
import {
  addTask,
  deleteTask,
  getAllTaskById,
  updateTask,
} from "../../controllers/taskController.js";

const router = express.Router();

router.get("/get/:id", getAllTaskById);
router.post("/add", addTask);
router.delete("/delete/:id", deleteTask);
router.post("/update/:id", updateTask);

export default router;
