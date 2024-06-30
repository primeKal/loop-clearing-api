import React from 'react';
import { Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Typography, 
  Select, 
  InputLabel,
  FormControl,
  MenuItem } from '@material-ui/core';
import { baseUrl } from '../../EndPoints';

function AddHero(props) {
  const [hero, setHero] = React.useState({
    name: '',
    email: '',
    password: '',
    // occupation: '',
    // age: '',
  });
  const fontSize = 20;

  const handleChange = (event) => {
    setHero({
      ...hero,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch(baseUrl + 'user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hero),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      props.getHeros();
      props.closeModal();
      return response.json();
    })
    .then(data => {
      // handle successful response
      console.log(data);
      props.closeModal();
    })
    .catch(error => {
      // handle error
      console.error('There was an error!', error);
    });
  };

  return (
    <Dialog open={props.isOpen} onClose={props.closeModal}>
      <DialogTitle>
        <Typography variant="h4">Add a new trading partner</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField name="name" label="Name" value={hero.name} onChange={handleChange} variant="outlined" fullWidth  inputProps={{ style: { fontSize: fontSize } }} InputLabelProps={{ style: { fontSize: fontSize } }} margin="normal"/>
          <TextField name="email" label="Email" value={hero.email} onChange={handleChange} variant="outlined" fullWidth inputProps={{ style: { fontSize: fontSize } }} InputLabelProps={{ style: { fontSize: fontSize } }} margin="normal" />
          <TextField name="password" label="Password" value={hero.password} onChange={handleChange} variant="outlined" fullWidth inputProps={{ style: { fontSize: fontSize } }} InputLabelProps={{ style: { fontSize: fontSize } }} margin="normal"/>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" style={{ fontSize: '15px' }} onClick={props.closeModal}>Cancel</Button>
        <Button variant="contained" style={{ fontSize: '15px' }} color="primary" onClick={handleSubmit}>Add Trading Partner</Button>
      </DialogActions>
    </Dialog>
  );
}
export default  AddHero;