import React, { useState, useReducer, useRef } from "react";
import { Grid, FormControl, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import EditItem from "./components/EditItem";
import DoneItem from "./components/DoneItem";
import ToDoItem from "./components/ToDoItem";

export interface TypeToDo {
  id: string;
  content: string;
  status: string;
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.todo];
    case "DELETE":
      return state.filter((todo: TypeToDo) => todo.id !== action.id);
    case "EDIT":
      return state.map((todo: TypeToDo) =>
        todo.id === action.id ? { ...todo, status: "edit" } : todo
      );
    case "DONE":
      return state.map((todo: TypeToDo) =>
        todo.id === action.id ? { ...todo, status: "done" } : todo
      );
    case "READY":
      return state.map((todo: TypeToDo) =>
        todo.id === action.id ? { ...todo, status: "ready" } : todo
      );
    case "UPDATE":
      return state.map((todo: TypeToDo) =>
        todo.id === action.id
          ? { ...todo, content: action.content, status: "ready" }
          : todo
      );
  }
};

const theme = createTheme({
  typography: {
    fontFamily: "Spoqa Han Sans",
  },
});

function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const toDoList = state;

  const [content, setContent] = useState<string>("");
  const countId = useRef<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  // toDoList에 item을 추가하는 함수
  const handleAdd = (c: string) => {
    if (c.replaceAll(" ", "") !== "") {
      dispatch({
        type: "ADD",
        todo: {
          id: countId.current,
          content: content,
          status: "ready",
        },
      });
      countId.current += 1;
    } else {
      alert("Please enter the content.");
    }
    setContent("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        rowSpacing={5}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: "80vw", margin: "5rem auto" }}
      >
        <Grid item>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            To Do List
          </Typography>
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
              sx={{ width: "15rem", ml: 5 }}
            />
          </FormControl>
          <CheckIcon
            onClick={() => handleAdd(content)}
            sx={{ color: "green", ml: 3 }}
          />
        </Grid>
        {toDoList.length > 1 ? (
          <Typography variant="body1" sx={{ mt: 3 }}>
            {toDoList.length} Items
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ mt: 3 }}>
            {toDoList.length} Item
          </Typography>
        )}
        <Grid item>
          {toDoList &&
            toDoList.map(
              (todo: any) =>
                todo.content &&
                (todo.status === "edit" ? (
                  <EditItem
                    todo={todo}
                    dispatch={dispatch}
                    key={todo.id}
                  />
                ) : todo.status === "done" ? (
                  <DoneItem todo={todo} dispatch={dispatch} key={todo.id} />
                ) : (
                  <ToDoItem
                    todo={todo}
                    dispatch={dispatch}
                    key={todo.id}
                  />
                ))
            )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
