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
  description: "",
  priority: "",
  dueDate: "",
  status: "",
  category: "",
};

export default function Todo() {
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);

  const [newTaskData, setNewTaskData] = useState(initialTaskData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);
  const [currentItemId, setCurrentItemId] = useState("");

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

  const handleOpenUpdateModal = (task, id) => {
    console.log(id);

    setEditTaskData(task);
    setIsModalOpen(true);
    setCurrentItemId(id);
    console.log(currentItemId);
  };

  const handleUpdate = () => {
    const updatedTask = {
      ...editTaskData,
      dueDate: new Date(editTaskData.dueDate).toISOString(),
    };

    dispatch(updateTask({ id: currentItemId, taskData: updatedTask })).then(
      () => {
        console.log(currentItemId);
        dispatch(getAllTaskById(user.id));
        setIsModalOpen(false);
        setEditTaskData(null);
      }
    );
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
                    onClick={() => handleOpenUpdateModal(item, item._id)}
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
            {/* Title */}
            <input
              type="text"
              placeholder="Task title"
              className="border p-2 w-full mb-3"
              value={editTaskData?.title || ""}
              onChange={(e) =>
                setEditTaskData({ ...editTaskData, title: e.target.value })
              }
            />
            {/* Description */}
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
            {/* Status */}
            <select
              className="border p-2 w-full mb-3"
              value={editTaskData?.status || ""}
              onChange={(e) =>
                setEditTaskData({ ...editTaskData, status: e.target.value })
              }
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
            {/* Priority */}
            <select
              className="border p-2 w-full mb-3"
              value={editTaskData?.priority || ""}
              onChange={(e) =>
                setEditTaskData({ ...editTaskData, priority: e.target.value })
              }
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {/* Due Date */}
            <input
              type="date"
              className="border p-2 w-full mb-3"
              value={editTaskData?.dueDate?.split("T")[0] || ""}
              onChange={(e) =>
                setEditTaskData({
                  ...editTaskData,
                  dueDate: e.target.value,
                })
              }
            />
            {/* Category */}
            <input
              type="text"
              placeholder="Categories (comma separated)"
              className="border p-2 w-full mb-3"
              value={editTaskData?.category?.join(", ") || ""}
              onChange={(e) =>
                setEditTaskData({
                  ...editTaskData,
                  category: e.target.value.split(",").map((cat) => cat.trim()),
                })
              }
            />
            {/* Buttons */}
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 mr-3 rounded"
                onClick={() => handleUpdate()}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
