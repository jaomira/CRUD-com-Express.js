import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});

// Array para armazenar os itens
let items = [];

// Create (criar)
app.post('/items', (req, res) => {
  const item = req.body;
  if (items.some(i => i.id === item.id)) {
    return res.status(400).json({ error: 'ID já registrado.' });
  }
  items.push(item);
  res.status(201).json(item);
});

// Read one (ler um)
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item não encontrado.' });
  }
});

// Read all (ler todos)
app.get('/items', (req, res) => {
  res.json(items);
});

// Update (atualizar)
app.put('/items/:id', (req, res) => {
  const id = req.params.id;
  const index = items.findIndex(i => i.id == id);
  if (index !== -1) {
    items[index] = req.body;
    res.json(items[index]);
  } else {
    res.status(404).json({ error: 'Item não encontrado.' });
  }
});

// Delete (deletar)
app.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  const index = items.findIndex(i => i.id == id);
  if (index !== -1) {
    const deleted = items.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Item não encontrado.' });
  }
});