import { useState } from "react";
import { Button } from "./ui/button";

const dummyData = [
  {
    id: 1,
    userId: "640f1e24a1d4f845a55b8b2c",
    title: "Complete React project",
    description: "Finish developing the user authentication system",
    status: "Pending",
    priority: "High",
    dueDate: new Date("2024-12-15"),
    createdAt: new Date("2024-12-08"),
    category: ["work", "development"],
  },
  {
    id: 2,
    userId: "640f1e24a1d4f845a55b8b2c",
    title: "Buy groceries",
    description: "Purchase milk, bread, eggs, and vegetables.",
    status: "Completed",
    priority: "Medium",
    dueDate: new Date("2024-12-09"),
    createdAt: new Date("2024-12-07"),
    category: ["personal", "shopping"],
  },
  {
    id: 3,
    userId: "640f1e24a1d4f845a55b8b2c",
    title: "Workout routine",
    description:
      "Complete 30 minutes of cardio and 20 minutes of strength training.",
    status: "Archived",
    priority: "Low",
    dueDate: new Date("2024-12-10"),
    createdAt: new Date("2024-12-05"),
    category: ["health", "fitness"],
  },
  {
    id: 4,
    userId: "640f1e24a1d4f845a55b8b2c",
    title: "Read a book",
    description: "Read 'The Great Gatsby' for the upcoming book club meeting.",
    status: "Pending",
    priority: "Medium",
    dueDate: new Date("2024-12-20"),
    createdAt: new Date("2024-12-06"),
    category: ["personal", "leisure"],
  },
];

export default function Todo() {
  const [tasks, setTasks] = useState(dummyData);

  function handleTaskAdd() {
    const newTask = {
      id: tasks.length + 1,
      userId: "640f1e24a1d4f845a55b8b2c",
      title: "New Task",
      description: "This is a new task",
      status: "Pending",
      priority: "Medium",
      dueDate: new Date("2024-12-25"),
      createdAt: new Date(),
      category: ["new", "task"],
    };

    if (tasks.some((task) => task.title === newTask.title)) {
      alert("Task with this title already exists!");
      return;
    }

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="text-4xl font-bold uppercase">Todo</div>
      <div className="w-[500px] h-auto p-5 bg-gray-100 border border-gray-300 mt-10 rounded-md shadow-md">
        {tasks.length > 0 ? (
          tasks.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3 rounded-md shadow mb-4 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <Button
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleDeleteTask(item.id)}
                >
                  Delete
                </Button>
              </div>
              <p className="text-gray-600 text-sm max-w-[300px]">{item.description}</p>
              <p className="text-gray-800 text-xs mt-3">
                Due: {item.dueDate.toDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks available.</p>
        )}
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600 mt-5"
          onClick={handleTaskAdd}
        >
          Add New Task
        </Button>
      </div>
    </div>
  );
}
