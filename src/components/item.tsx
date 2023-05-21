import { Card, CardContent, Checkbox, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
export type CardProps = {
  text: string;
  id: string;
  onDelete: () => void;
  onUpdate: () => void;
};

export const Item = ({ text, id, onDelete, onUpdate }: CardProps) => {
  const handleDelete = () => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onDelete(); // Call the onDelete callback to update the UI
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: "test" }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onUpdate(); // Call the onDelete callback to update the UI
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Card variant="outlined">
      <CardContent sx={{ display: "flex" }}>
        <Checkbox {...label} />
        <p>{text}</p>

        <Fab
          color="primary"
          aria-label="delete"
          onClick={handleDelete}
          sx={{ marginLeft: "auto" }}
        >
          <DeleteIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit" onClick={handleUpdate}>
          <EditIcon />
        </Fab>
      </CardContent>
    </Card>
  );
};
