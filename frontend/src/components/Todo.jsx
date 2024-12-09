import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, getAllTaskById } from "@/slice/taskSlice";

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

  useEffect(() => {
    if (user && user.id) {
      dispatch(getAllTaskById(user.id));
    }
  }, [dispatch, user]);

  function handleTaskAdd() {
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
      id: tasks.length + 1,
      userId: user.id,
      title: newTaskData.title,
      description: newTaskData.description,
      status: "Pending",
      priority: newTaskData.priority,
      dueDate: dueDate.toISOString(),
      createdAt: new Date().toISOString(),
      category: ["new", "task"],
    };

    if (
      Array.isArray(tasks) &&
      tasks.some((task) => task.title === newTask.title)
    ) {
      alert("Task with this title already exists!");
      return;
    }

    dispatch(addTask(newTask)).then(() => {
      dispatch(getAllTaskById(user.id));
      setNewTaskData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: new Date(),
      });
    });
  }

  function handleDelete(id) {
    dispatch(deleteTask(id)).then((data) => {
      console.log(data);
      // dispatch(getAllTaskById(user.id));
    });
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="text-4xl font-bold uppercase">Todo</div>
      {console.log(tasks)}
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
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <Button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
              <p className="text-gray-600 text-sm max-w-[300px]">
                {item.description}
              </p>
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
    </div>
  );
}
