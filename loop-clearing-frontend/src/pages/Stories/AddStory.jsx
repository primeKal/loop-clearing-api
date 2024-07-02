import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  MenuItem,
} from "@material-ui/core";
import { baseUrl } from "../../EndPoints";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function AddStory(props) {
  const [testimony, setStory] = useState({
    clearing_cycle: 0,
    transactions: [],
  });
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  const [transactionData, setTransaction] = React.useState([]);

  const getTransactions = async () => {
    fetch(`${baseUrl}transaction`)
      .then((response) => response.json())
      .then((data) => setTransaction(setTransactionsWithName(data)));
  };
  const setTransactionsWithName = (data) => {
    data = data.forEach((element) => {
      element.name =
        element.user?.name +
        "->" +
        element.partner?.name +
        "=" +
        element.amount;
    });
    return data;
  };
  useEffect(() => {
    getTransactions();
  }, []);

  const handleChange = (event) => {
    setStory({
      ...testimony,
      [event.target.name]: event.target.value,
    });
  };
  const fontSize = 20;

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(baseUrl + "clearing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...testimony, heroId: testimony.hero }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        props.getStories();
        props.closeModal();
        return response.json();
      })
      .then((data) => {
        // handle successful response
        console.log(data);
        props.closeModal();
      })
      .catch((error) => {
        // handle error
        console.error("There was an error!", error);
      });
  };

  return (
    <Dialog open={props.isOpen} onClose={props.closeModal}>
      <DialogTitle>
        <Typography variant="h4">Add a new Story</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Title"
            value={testimony.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            inputProps={{ style: { fontSize: fontSize } }}
            InputLabelProps={{ style: { fontSize: fontSize } }}
            margin="normal"
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Transactions
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedTransactions}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {transactionData.map((transaction) => (
                <MenuItem key={transaction.id} value={transaction.name}>
                  <Checkbox checked={selectedTransactions.indexOf(transaction.name) > -1} />
                  <ListItemText primary={transaction.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="description"
            label="Description"
            value={testimony.description}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            inputProps={{ style: { fontSize: fontSize } }}
            InputLabelProps={{ style: { fontSize: fontSize } }}
            margin="normal"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{ fontSize: "15px" }}
          onClick={props.closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{ fontSize: "15px" }}
          color="primary"
          onClick={handleSubmit}
        >
          Start Clearing
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddStory;
