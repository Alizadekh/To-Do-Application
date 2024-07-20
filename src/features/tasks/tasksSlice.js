import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set, get, remove, push } from "firebase/database";
import { db } from "../../firebase";

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (userId) => {
    const tasksRef = ref(db, `tasks/${userId}`);
    const snapshot = await get(tasksRef);
    const data = snapshot.val() || {};
    return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ userId, task }) => {
    const tasksRef = ref(db, `tasks/${userId}`);
    const newTaskRef = push(tasksRef);
    await set(newTaskRef, task);
    return { id: newTaskRef.key, ...task };
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ userId, taskId }) => {
    const taskRef = ref(db, `tasks/${userId}/${taskId}`);
    await remove(taskRef);
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
