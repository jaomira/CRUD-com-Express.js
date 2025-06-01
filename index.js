import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});

// Array para armazenar as músicas
let songs = [];

// Create (criar)
app.post('/songs', (req, res) => {
  const song = req.body;
  if (songs.some(i => i.id === song.id)) {
    return res.status(400).json({ error: 'Música já registrada.' });
  }
  songs.push(song);
  res.status(201).json(song);
});

// Read one (ler um)
app.get('/songs/:id', (req, res) => {
  const song = songs.find(i => i.id == req.params.id);
  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ error: 'Música não encontrada.' });
  }
});

// Read all (ler todos)
app.get('/songs', (req, res) => {
  res.json(songs);
});

// Update (atualizar)
app.put('/songs/:id', (req, res) => {
  const id = req.params.id;
  const index = songs.findIndex(i => i.id == id);
  if (index !== -1) {
    songs[index] = req.body;
    res.json(songs[index]);
  } else {
    res.status(404).json({ error: 'Música não encontrada.' });
  }
});

// Delete (deletar)
app.delete('/songs/:id', (req, res) => {
  const id = req.params.id;
  const index = songs.findIndex(i => i.id == id);
  if (index !== -1) {
    const deleted = songs.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Música não encontrada.' });
  }
});