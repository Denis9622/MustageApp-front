import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async params => {
  const response = await axios.get(API_URL, { params });
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async task => {
  const response = await axios.post(API_URL, task);
  return response.data;
});

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, task }) => {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async id => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex(t => t._id === action.payload._id);
        if (idx !== -1) state.tasks[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
