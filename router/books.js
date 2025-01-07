const express = require('express');
const books = require('./booksdb.js');
const booksRouter = express.Router();

// Task 5: Get Book Review
booksRouter.get('/reviews/:isbn', (req, res) => {
    const { isbn } = req.params;
    if (books[isbn] && books[isbn].reviews) {
        res.status(200).json(books[isbn].reviews);
    } else {
        res.status(404).json({ message: 'Book not found or no reviews available.' });
    }
});

// Task 8: Add/Modify a Book Review
booksRouter.post('/reviews/:isbn', (req, res) => {
    const { isbn } = req.params;
    const { username, review } = req.body;
    if (!username || !review) {
        return res.status(400).json({ message: 'Username and review are required.' });
    }
    if (books[isbn]) {
        books[isbn].reviews[username] = review;
        res.status(200).json({ message: 'Review added/modified successfully.' });
    } else {
        res.status(404).json({ message: 'Book not found.' });
    }
});

// Task 9: Delete a Book Review
booksRouter.delete('/reviews/:isbn', (req, res) => {
    const { isbn } = req.params;
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'Username is required.' });
    }
    if (books[isbn] && books[isbn].reviews[username]) {
        delete books[isbn].reviews[username];
        res.status(200).json({ message: 'Review deleted successfully.' });
    } else {
        res.status(404).json({ message: 'Book or review not found.' });
    }
});

module.exports = booksRouter;

