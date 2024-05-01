const express = require('express');
const app = express();
app.listen(3000);

const animals = [
  { id: 1, name: 'cat' },
  { id: 2, name: 'frog' },
  { id: 3, name: 'panda' },
  { id: 4, name: 'rabbit' },
  { id: 5, name: 'hamster' },
];

app.get('/animals', (req, res) => {
  res.json(animals);
});

app.get('/animals/:id', (req, res) => {
  const paramID = parseInt(req.params.id);

  const foundAnimal = animals.find((animal) => animal.id === paramID);

  if (foundAnimal) {
    res.json(foundAnimal);
  } else {
    res.status(404).json({
      message: `${paramID}번 동물이 없습니다.`,
    });
  }
});
