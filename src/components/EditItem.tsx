import React, { Dispatch, SetStateAction } from "react";
import { Grid, FormControl, Input } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { TypeToDo } from "../App";

interface EditType {
  todo: TypeToDo;
  handleUpdate: (todo: TypeToDo) => void;
  editContent: string;
  setEditContent: Dispatch<SetStateAction<string>>;
}

export default function EditItem({
  todo,
  handleUpdate,
  editContent,
  setEditContent,
}: EditType) {
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
        <CheckIcon onClick={() => handleUpdate(todo)} sx={{ color: "green" }} />
      </Grid>
    </Grid>
  );
}
