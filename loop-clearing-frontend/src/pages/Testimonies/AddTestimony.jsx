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
  MenuItem,
} from "@material-ui/core";
import { baseUrl } from "../../EndPoints";

function AddTestimony(props) {
  const userData = useSelector((state) => state.loggedInStatus.userData);
  const [testimony, setTestimony] = useState({
    value: 0,
    partner_id: "",
    user_id: userData?.id,
    // description: '',
  });

  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}user`)
      .then((response) => response.json())
      .then((data) => setHeroes(data));
  }, []);

  const handleChange = (event) => {
    setTestimony({
      ...testimony,
      [event.target.name]: event.target.value,
    });
  };
  const fontSize = 20;

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(baseUrl + "transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: parseInt(testimony.value),
        partner_id: parseInt(testimony.partner_id),
        user_id: parseInt(testimony.user_id),
      }),
      // body: JSON.stringify({...testimony, heroId: parseInt(testimony.hero)}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        props.getTestimonies();
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
        <Typography variant="h4">Add a new Transaction</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="value"
            label="Value"
            value={testimony.value}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            inputProps={{ style: { fontSize: fontSize } }}
            InputLabelProps={{ style: { fontSize: fontSize } }}
            margin="normal"
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="hero-label" style={{ fontSize: fontSize }}>
              Partner
            </InputLabel>
            <Select
              labelId="hero-label"
              name="partner_id"
              value={testimony.partner_id}
              onChange={handleChange}
            >
              {heroes.map((hero) => (
                <MenuItem
                  key={hero.id}
                  value={hero.id}
                  style={{ fontSize: fontSize }}
                >
                  {hero.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="description"
            label="Comment"
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
          Add Transaction
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTestimony;
