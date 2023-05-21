import { Card, CardContent, Checkbox, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export type CardProps = { text: string; id: string; onDelete: () => void };

export const Item = ({ text, id, onDelete }: CardProps) => {
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

  return (
    <Card variant="outlined">
      <CardContent sx={{ display: "flex" }}>
        <Checkbox {...label} />
        {text}

        <Fab
          color="primary"
          aria-label="delete"
          onClick={handleDelete}
          sx={{ marginLeft: "auto" }}
        >
          <DeleteIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit">
          <EditIcon />
        </Fab>
      </CardContent>
    </Card>
  );
};
