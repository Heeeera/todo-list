import React from "react";
import { Grid, Checkbox, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { TypeToDo } from "../App";

interface DoneType {
  todo: TypeToDo;
  dispatch: any;
}

export default function DoneItem({ todo, dispatch }: DoneType) {
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
          onChange={() => dispatch({ type: "READY", id: todo.id })}
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
          onClick={() => dispatch({ type: "DELETE", id: todo.id })}
          sx={{ color: "#f05650" }}
        />
      </Grid>
    </Grid>
  );
}
