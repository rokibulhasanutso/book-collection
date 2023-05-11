const express = require('express');
const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// Parse JSON request bodies
app.use(express.json());

// Initialize books array
let books = [];

// GET /books route handler
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books route handler
app.post('/books', (req, res) => {
  const id = Date.now().toString();
  const { title, author, publishedDate } = req.body;
  const book = {
    id,
    title,
    author,
    publishedDate
  };
  
  books.push(book);
  res.json(book);
});

// DELETE /books/:id route handler
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(book => book.id === id);
  
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: `ID: ${id} [ This book successfully deleted ]` });
  } else {
    res.status(404).json({ message: `ID: ${id} [ This book not found ]` });
  }
});

// GET root route handler
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
