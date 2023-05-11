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
  const book = req.body;
  book.id = Math.random().toString(36).substr(2, 9);
  books.push(book);
  res.json(book);
});

// DELETE /books/:id route handler
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: 'Book successfully deleted' });
  } else {
    res.status(404).json({ message: 'Book not found' });
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
