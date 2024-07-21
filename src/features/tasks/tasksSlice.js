import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (userId) => {
    const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`)) || [];
    return tasks;
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ userId, task }) => {
    const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`)) || [];
    const newTask = { id: new Date().getTime().toString(), ...task };
    tasks.push(newTask);
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
    return newTask;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ userId, taskId }) => {
    let tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`)) || [];
    tasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
    return taskId;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
