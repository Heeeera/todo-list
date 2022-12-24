import React from "react";
import { Grid, Checkbox, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import { TypeToDo } from "../App";

interface ToDoType {
  todo: TypeToDo;
  dispatch: any;
}

export default function ToDoItem({ todo, dispatch }: ToDoType) {
  return (
    <Grid
      container
      direction="row"
      key={todo.id}
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <Grid item>
        <Checkbox onChange={() => dispatch({ type: "DONE", id: todo.id })} />
      </Grid>
      <Grid item>
        <Typography sx={{ width: "14.5rem" }}>{todo.content}</Typography>
      </Grid>
      <Grid item>
        <EditIcon
          onClick={() => {
            dispatch({ type: "EDIT", id: todo.id });
          }}
          sx={{ color: "grey", mr: 1 }}
        />
        <HighlightOffIcon
          onClick={() => dispatch({ type: "DELETE", id: todo.id })}
          sx={{ color: "#f05650" }}
        />
      </Grid>
    </Grid>
  );
}
