import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true, // Removes any extra whitespace
    },
    description: {
      type: String,
      trim: true, // Ensures no leading/trailing spaces
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Archived"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    dueDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Auto-generates current date if not provided
    },
    category: {
      type: [String], // Allows multiple categories for a task
      default: [], // Defaults to an empty array if not set
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.every((item) => typeof item === 'string');
        },
        message: "Each category must be a string",
      },
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
