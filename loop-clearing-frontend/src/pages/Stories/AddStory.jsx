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
  Box,
  Chip
} from "@material-ui/core";
import { baseUrl } from "../../EndPoints";
import { useDispatch, useSelector } from "react-redux";

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
  const userData = useSelector((state) => state.loggedInStatus.userData);
  const [testimony, setStory] = useState({
    clearing_cycle: `Clearing For ${new Date().toISOString().split("T")[0]}`,
    transactions: [],
    user_id: userData?.id,
  });
  const [selectedTransactionData, setSelectedTransactionData] = useState([]);

  const [transactionData, setTransactionData] = React.useState([]);

  const [selectedRoleIds, setSelectedRoleIds] = useState([]);

  const getTransactions = async () => {
    fetch(`${baseUrl}transaction`)
      .then((response) => response.json())
      .then((data) => setTransactionData(setTransactionsWithName(data)));
  };
  const setTransactionsWithName = (data) => {
    data.forEach((element) => {
      element.name =
        element.user?.name + "->" + element.partner?.name + "=" + element.value;
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

  const handleRoleChange = (event) => {
    const { value } = event.target;
    setSelectedRoleIds(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(baseUrl + "clearing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...testimony,
        transactions: selectedRoleIds,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        props.getStories();
        props.closeModal();
        return response.json();
      })
      .catch((error) => {
        // handle error
        console.error("There was an error!", error);
      });
  };

  return (
    <Dialog open={props.isOpen} onClose={props.closeModal}>
      <DialogTitle>
        <Typography variant="h4">Start A New Clearing Cycle</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Title"
            defaultValue={`Clearing For ${new Date().toISOString().split("T")[0]}`}
            value={testimony.name}
            onChange={handleChange}
            variant="outlined"
            disabled
            fullWidth
            inputProps={{ style: { fontSize: fontSize } }}
            InputLabelProps={{ style: { fontSize: fontSize } }}
            margin="normal"
          />
          {transactionData && (
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="multi-select-label">
                Select Transactions
              </InputLabel>
              <Select
                multiple
                value={selectedRoleIds}
                onChange={handleRoleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((roleId) => (
                      <Chip
                        key={roleId}
                        label={transactionData?.find((e) => e.id === roleId).name}
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {transactionData.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    <Checkbox checked={selectedRoleIds.includes(role.id)} />
                    <ListItemText primary={role.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
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
