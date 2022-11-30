import React from "react";
import { Grid, Checkbox, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { TypeToDo } from "../App";

interface DoneType {
  todo: TypeToDo;
  handleDelete: (id: string) => void;
  handleStatus: (todo: TypeToDo, text: string ) => void;
}

export default function DoneItem({ todo, handleDelete, handleStatus }: DoneType) {
  return (
    <Grid
      container
      direction="row"
      key={todo.id}
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <Grid item>
        <Checkbox
          checked
          color="success"
          onChange={() => handleStatus(todo, "ready")}
        />
      </Grid>
      <Grid item>
        <Typography
          sx={{
            width: "16.5rem",
            textDecoration: "line-through",
            color: "lightgrey",
          }}
        >
          {todo.content}
        </Typography>
      </Grid>
      <Grid item>
        <HighlightOffIcon
          onClick={() => handleDelete(todo.id)}
          sx={{ color: "#f05650" }}
        />
      </Grid>
    </Grid>
  );
}
