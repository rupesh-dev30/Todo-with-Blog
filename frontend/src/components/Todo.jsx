import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  getAllTaskById,
  updateTask,
} from "@/slice/taskSlice";

const initialTaskData = {
  title: "",
  description: "description for better readability",
  priority: "Medium",
  dueDate: new Date(),
};

export default function Todo() {
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);

  const [newTaskData, setNewTaskData] = useState(initialTaskData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getAllTaskById(user.id));
    }
  }, [dispatch, user]);

  const handleTaskAdd = () => {
    if (!newTaskData.title) {
      alert("Title required");
      return;
    }

    const dueDate = new Date(newTaskData.dueDate);
    if (isNaN(dueDate.getTime())) {
      alert("Invalid due date");
      return;
    }

    const newTask = {
      userId: user.id,
      title: newTaskData.title,
      description: newTaskData.description,
      status: "Pending",
      priority: newTaskData.priority,
      dueDate: dueDate.toISOString(),
      createdAt: new Date().toISOString(),
      category: ["new", "task"],
    };

    dispatch(addTask(newTask)).then(() => {
      dispatch(getAllTaskById(user.id));
      setNewTaskData(initialTaskData);
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      dispatch(getAllTaskById(user.id));
    });
  };

  const handleOpenUpdateModal = (task) => {
    setEditTaskData(task);
    setIsModalOpen(true);
  };

  const handleUpdate = (id) => {
    const updatedTask = {
      ...editTaskData,
      dueDate: new Date(editTaskData.dueDate).toISOString(),
    };

    dispatch(updateTask(id, updatedTask)).then(() => {
      dispatch(getAllTaskById(user.id));
      setIsModalOpen(false);
      setEditTaskData(null);
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="text-4xl font-bold uppercase">Todo</div>
      <div className="w-[500px] h-auto p-5 bg-gray-100 border border-gray-300 mt-10 rounded-md shadow-md">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : tasks.tasks?.length > 0 ? (
          tasks.tasks.map((item) => (
            <div
              key={item._id}
              className="bg-white p-3 rounded-md shadow mb-4 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg uppercase">
                  {item.title}
                </h4>
                <div className="flex gap-2">
                  <Button
                    className="bg-green-500 text-white hover:bg-green-600"
                    onClick={() => handleOpenUpdateModal(item)}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="text-gray-800 text-xs mt-3">
                Due: {new Date(item.dueDate).toDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks available.</p>
        )}

        <div className="mt-5">
          <input
            type="text"
            placeholder="Task title"
            className="border p-2 w-full mb-2"
            value={newTaskData.title}
            onChange={(e) =>
              setNewTaskData({ ...newTaskData, title: e.target.value })
            }
          />
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600 mt-5"
            onClick={handleTaskAdd}
          >
            Add New Task
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-lg w-[400px]">
            <h3 className="text-xl font-bold mb-4">Update Task</h3>
            <input
              type="text"
              placeholder="Task title"
              className="border p-2 w-full mb-3"
              value={editTaskData?.title || ""}
              onChange={(e) =>
                setEditTaskData({ ...editTaskData, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="border p-2 w-full mb-3"
              value={editTaskData?.description || ""}
              onChange={(e) =>
                setEditTaskData({
                  ...editTaskData,
                  description: e.target.value,
                })
              }
            />
            <Button
              className="bg-green-500 text-white hover:bg-green-600 mr-3"
              onClick={() => handleUpdate(tasks.tasks._id)}
            >
              Save
            </Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
