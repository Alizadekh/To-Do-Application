import React from "react";
import style from "./List.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function List({ items, handleDelete }) {
  const calculateTimeLeft = (deadline) => {
    const difference = new Date(deadline) - new Date();
    let timeLeft = "";

    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);
      timeLeft = `${days > 0 ? `${days} days, ` : ""}${hours % 24} hours`;
    } else {
      timeLeft = "Deadline passed";
    }

    return timeLeft;
  };

  return (
    <div className={style.allItems}>
      {items.map((task) => (
        <Accordion key={task.id} className={`${style.item} fadeIn`}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={style.todoTitle}>{task.title}</Typography>
          </AccordionSummary>
          <AccordionDetails className={style.todoDesc}>
            <Typography>{task.description}</Typography>
            {task.deadline && (
              <Typography className={style.todoDeadline}>
                Deadline: {new Date(task.deadline).toLocaleString()} (
                {calculateTimeLeft(task.deadline)} remaining)
              </Typography>
            )}
            <button
              className={style.todoRemoveBtn}
              onClick={() => handleDelete(task.id)}
            >
              <h3>Remove</h3>
            </button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default List;
