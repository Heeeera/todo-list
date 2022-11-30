import React, { useState, useReducer, useRef } from "react";
import {
  Container,
  Grid,
  Button,
  FormControl,
  TextField,
  Input,
  Typography,
  Checkbox,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.todo];
    case "DELETE":
      return state.filter((todo: any) => todo.id !== action.id);
    case "EDIT":
      return state.map((todo: any) =>
        todo.id === action.id ? { ...todo, status: "edit" } : todo
      );
    case "UPDATE":
      return state.map((todo: any) =>
        todo.id === action.id
          ? { ...todo, content: action.content, status: "ready" }
          : todo
      );
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const toDoList = state;

  const [content, setContent] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const countId = useRef<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value);
  };

  const handleAdd = () => {
    dispatch({
      type: "ADD",
      todo: {
        id: countId.current,
        content: content,
        status: "ready",
      },
    });
    countId.current += 1;
    setContent("");
  };

  const handleDelete = (id: any) => {
    dispatch({
      type: "DELETE",
      id: id,
    });
  };

  const handleEdit = (todo: any) => {
    setEditContent(todo.content);
    dispatch({
      type: "EDIT",
      id: todo.id,
    });
  };

  const handleUpdate = (todo: any) => {
    dispatch({
      type: "UPDATE",
      id: todo.id,
      content: editContent,
    });
    setEditContent("");
  };

  return (
    <Grid
      container
      spacing={5}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h2">To do list</Typography>
      </Grid>
      <Grid item sx={{ display: "flex", alignItems: "center" }}>
        <FormControl>
          <TextField
            required
            id="to-do-input"
            value={content}
            placeholder="Add new item"
            size="small"
            onChange={handleChange}
          />
        </FormControl>
        <CheckIcon onClick={handleAdd} sx={{ color: "green", ml: 2 }} />
      </Grid>
      <Grid item>
        {toDoList &&
          toDoList.map(
            (todo: any) =>
              todo.content &&
              (todo.status === "edit" ? (
                <Grid container direction="row" key={todo.id}>
                  <Grid item>
                    <FormControl>
                      <Input
                        defaultValue={todo.content}
                        onChange={handleEditChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <CheckIcon
                      onClick={() => handleUpdate(todo)}
                      sx={{ color: "green", ml: 2 }}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  direction="row"
                  key={todo.id}
                  alignItems="center"
                >
                  <Grid item>
                    <Checkbox />
                  </Grid>
                  <Grid item>
                    <Typography>{todo.content}</Typography>
                  </Grid>
                  <Grid item>
                    <EditIcon onClick={() => handleEdit(todo)} />
                    <HighlightOffIcon
                      onClick={() => handleDelete(todo.id)}
                      sx={{ color: "red" }}
                    />
                  </Grid>
                </Grid>
              ))
          )}
      </Grid>
    </Grid>
  );
}

export default App;
