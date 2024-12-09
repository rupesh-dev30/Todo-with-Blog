import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import Task from "../models/TaskSchema.js";
import mongoose from "mongoose";

const getAllTaskById = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userIdFromToken = decoded.id;

    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    if (id !== userIdFromToken) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const userIdObjectId = new mongoose.Types.ObjectId(id);

    const tasks = await Task.find({ userId: userIdObjectId });

    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const addTask = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const { title, description, status, priority, dueDate, category } =
      req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const newTask = new Task({
      userId: user._id,
      title,
      description,
      status,
      priority,
      dueDate,
      category,
    });

    await newTask.save();

    return res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteTask = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  console.log("rrrrrrr");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { id: taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    console.log(task.userId, userId);

    if (task.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this task",
      });
    }

    await Task.findByIdAndDelete(taskId);

    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete task", error: error.message });
  }
};

// const updateTask = async (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.id;
//     const { id: taskId } = req.params;
//     console.log(id);
//     const taskData = req.body;

//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ success: false, message: "Task not found" });
//     }

//     if (task.userId.toString() !== userId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You do not have permission to update this task",
//       });
//     }

//     const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, {
//       new: true,
//       runValidators: true,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Task updated successfully!",
//       task: updatedTask,
//     });
//   } catch (error) {
//     console.error("Error updating task:", error);

//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ success: false, message: "Invalid token" });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Failed to update task",
//       error: error.message,
//     });
//   }
// };

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, status, priority, dueDate, createdAt, category } = req.body;

    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.createdAt = createdAt || task.createdAt;
    task.category = category || task.category

    await task.save();
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error editting task.",
    });
  }
};

export { getAllTaskById, addTask, deleteTask, updateTask };
