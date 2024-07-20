import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  addTask,
  deleteTask,
} from "../../features/tasks/tasksSlice";
import List from "../List/List";
import style from "./Todo.module.css";
import { auth } from "../../firebase";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

function Todo() {
  const [element, setElement] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state) => state.tasks);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      dispatch(fetchTasks(userId));
    }
  }, [dispatch, userId]);

  const handleChange = (e) => {
    setElement(e.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDeadlineChange = (e) => setDeadline(e.target.value);

  const handleAdd = () => {
    if (title.trim() && element.trim() && userId) {
      dispatch(
        addTask({ userId, task: { title, description: element, deadline } })
      );
      setTitle("");
      setElement("");
      setDeadline("");
      handleClose();
    }
  };

  const handleDelete = (taskId) => {
    if (userId) {
      dispatch(deleteTask({ userId, taskId }));
    }
  };

  return (
    <div className={style.todo}>
      <h1 className={style.title}>What do you want to do?</h1>
      <div className={style.inputDiv}>
        <input value={element} onChange={handleChange} type="text" />
        <button onClick={handleOpen}>Add</button>
      </div>
      {status === "loading" && <p>Loading...</p>}
      <List items={tasks} handleDelete={handleDelete} />

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            ...style,
            width: 400,
            margin: "auto",
            mt: 8,
            p: 4,
            bgcolor: "#ff9100",
            boxShadow: 24,
          }}
        >
          <Typography variant="h6">Please type your todo title</Typography>
          <TextField
            className={style.titleInput}
            label="Title"
            value={title}
            onChange={handleTitleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Deadline"
            type="datetime-local"
            value={deadline}
            onChange={handleDeadlineChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            className={style.addBtn}
            variant="contained"
            onClick={handleAdd}
            sx={{ mt: 2 }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Todo;
