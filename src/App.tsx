import React, { useEffect, useState } from "react";
import "./index.css";
import { Header } from "./components/header";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { Item } from "./components/item";

type Task = {
  _id: string;
  text: string;
};

function App() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [missions, SetMissions] = useState<Task[]>([]);
  const [mission, SetMission] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        SetMissions(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const deleteItem = (id: string) => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        const updatedMissions = missions.filter(
          (mission) => mission._id !== id
        );
        SetMissions(updatedMissions);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addItem = () => {
    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: mission }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedMissions = [...missions, data];
        SetMissions(updatedMissions);
        SetMission("");
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="App">
      <Header content="to do list" />
      <TextField
        id="outlined-basic"
        variant="outlined"
        sx={{ width: "450px", paddingTop: "25px", marginLeft: "450px" }}
        value={mission}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          SetMission(event.target.value);
        }}
      />
      <Button
        variant="contained"
        sx={{
          marginTop: "25px",
          height: "55px",
        }}
        onClick={addItem}
      >
        click to add
      </Button>
      <br />
      <br />
      <br />
      {missions.map((mission) => (
        <Box key={mission._id} sx={{ minWidth: 275 }}>
          <Item
            text={mission.text}
            id={mission._id}
            onDelete={() => deleteItem(mission._id)}
          />
        </Box>
      ))}
    </div>
  );
}

export default App;
