import React from "react";
import { Grid, Checkbox, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import { TypeToDo } from "../App";

interface ToDoType {
  todo: TypeToDo;
  handleDelete: (id: string) => void;
  handleStatus: (todo: TypeToDo, text: string) => void;
}

export default function ToDoItem({
  todo,
  handleDelete,
  handleStatus,
}: ToDoType) {
  return (
    <Grid
      container
      direction="row"
      key={todo.id}
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <Grid item>
        <Checkbox onChange={() => handleStatus(todo, "done")} />
      </Grid>
      <Grid item>
        <Typography sx={{ width: "14.5rem" }}>{todo.content}</Typography>
      </Grid>
      <Grid item>
        <EditIcon
          onClick={() => handleStatus(todo, "edit")}
          sx={{ color: "grey", mr: 1 }}
        />
        <HighlightOffIcon
          onClick={() => handleDelete(todo.id)}
          sx={{ color: "#f05650" }}
        />
      </Grid>
    </Grid>
  );
}
