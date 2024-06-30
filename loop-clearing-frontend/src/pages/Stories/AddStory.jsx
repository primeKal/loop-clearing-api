import React, { useEffect, useState } from 'react';
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

function AddStory(props) {
  const [testimony, setStory] = useState({
    name: '',
    hero: '',
    description: '',
  });

  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}heros`)
      .then(response => response.json())
      .then(data => setHeroes(data));
  }, []);

  const handleChange = (event) => {
    setStory({
      ...testimony,
      [event.target.name]: event.target.value
    });
  };
  const fontSize = 20;

  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch(baseUrl + 'stories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...testimony, heroId: testimony.hero}),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      props.getStories();
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
        <Typography variant="h4">Add a new Story</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField name="name" label="Title" value={testimony.name} onChange={handleChange} variant="outlined" fullWidth inputProps={{ style: { fontSize: fontSize } }} InputLabelProps={{ style: { fontSize: fontSize } }} margin="normal"/>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="hero-label" style={{ fontSize: fontSize }}>Hero</InputLabel>
            <Select labelId="hero-label" name="hero" value={testimony.hero} onChange={handleChange}>
              {heroes.map((hero) => (
                <MenuItem key={hero.id} value={hero.id} style={{ fontSize: fontSize }}>{hero.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField name="description" label="Description" value={testimony.description} onChange={handleChange} variant="outlined" fullWidth inputProps={{ style: { fontSize: fontSize } }} InputLabelProps={{ style: { fontSize: fontSize } }} margin="normal"/>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" style={{ fontSize: '15px' }} onClick={props.closeModal}>Cancel</Button>
        <Button variant="contained" style={{ fontSize: '15px' }} color="primary" onClick={handleSubmit}>Add Story</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddStory;