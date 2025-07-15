import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasksApi, addTaskApi, updateTaskApi, deleteTaskApi } from "../services/tasksApi";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (params) => {
  const response = await fetchTasksApi(params);
  return response.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await addTaskApi(task);
  return response.data;
});

export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, task }) => {
  const response = await updateTaskApi(id, task);
  return response.data;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await deleteTaskApi(id);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = "succeeded";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.tasks[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
