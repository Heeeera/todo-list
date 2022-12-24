import React, { useState } from "react";
import { Grid, FormControl, Input } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { TypeToDo } from "../App";

interface EditType {
  todo: TypeToDo;
  dispatch: any;
}

export default function EditItem({ todo, dispatch }: EditType) {
  const [editContent, setEditContent] = useState<string>("");
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value);
  };

  return (
    <Grid
      container
      direction="row"
      key={todo.id}
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <Grid item>
        <FormControl>
          <Input
            defaultValue={todo.content}
            onChange={handleEditChange}
            sx={{ width: "15rem", ml: 5, mr: 3.2 }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <CheckIcon
          onClick={() =>
            dispatch({ type: "UPDATE", id: todo.id, content: editContent })
          }
          sx={{ color: "green" }}
        />
      </Grid>
    </Grid>
  );
}
