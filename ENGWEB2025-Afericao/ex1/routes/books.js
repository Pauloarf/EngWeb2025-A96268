var express = require('express');
var router = express.Router();
var Book = require('../controllers/book');

// GET /books: List all books or search by character
router.get('/', async function(req, res, next) {
    if (req.query.character) {
        // If 'character' query is provided, filter books by character
        const booksByCharacter = await Book.findByCharacter(req.query.character);
        return res.json(booksByCharacter);
    } else if (req.query.genre) {
        // If 'genre' query is provided, filter books by genre
        const booksByGenre = await Book.findByGenre(req.query.genre);
        return res.json(booksByGenre);
    } else {
        // Default to listing all books
        const booklist = await Book.list();
        res.json(booklist);
    }
});

// GET /books/genres: List unique genres ordered alphabetically
router.get('/genres', async function(req, res, next) {
    const genres = await Book.listGenres();
    res.json(genres);
});

// GET /books/characters: List unique characters ordered alphabetically
router.get('/characters', async function(req, res, next) {
    const characters = await Book.listCharacters();
    res.json(characters);
});

// GET /books/:id: Find a book by its ID
router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

// POST /books: Add a new book
router.post('/', async function(req, res, next) {
    const bookData = req.body;
    try {
        const newBook = await Book.createBook(bookData);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: 'Error creating book', details: error.message });
    }
});

// DELETE /books/:id: Delete a book by its ID
router.delete('/:id', async function(req, res, next) {
    const id = req.params.id;
    try {
        const deletedBook = await Book.deleteBook(id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book', details: error.message });
    }
});

// PUT /books/:id: Update a book by its ID
router.put('/:id', async function(req, res, next) {
    const id = req.params.id;
    const updateData = req.body;
    try {
        const updatedBook = await Book.updateBook(id, updateData);
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ error: 'Error updating book', details: error.message });
    }
});

module.exports = router;
