import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  tasks: [],
};

export const getAllTaskById = createAsyncThunk(
  "todo/getAllTasks",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/todo/get/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching tasks");
    }
  }
);

export const addTask = createAsyncThunk(
  "todo/addTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/todo/add",
        taskData,
        {
          withCredentials: true,
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding task");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "todo/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `http://localhost:3000/api/todo/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting task");
    }
  }
);

export const updateTask = createAsyncThunk(
  "todo/updateTask",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `http://localhost:3000/api/todo/update/${id}`,
        taskData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating task");
    }
  }
);

const taskSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTaskById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload && action.payload.tasks;
        console.log(action.payload.tasks);        
        
        state.tasks = action.payload;
      })
      .addCase(getAllTaskById.rejected, (state) => {
        (state.isLoading = false), (state.tasks = []);
      });
  },
});

export default taskSlice.reducer;