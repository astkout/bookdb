// const express = require('express');
// let books = require("./booksdb.js");
// let isValid = require("./auth_users.js").isValid;
// let users = require("./auth_users.js").users;
// const public_users = express.Router();


// public_users.post("/register", (req,res) => {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

// // Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

// // Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
//  });
  
// // Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

// // Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

// //  Get book review
// public_users.get('/review/:isbn',function (req, res) {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

// module.exports.general = public_users;

const express = require('express');
const books = require('./booksdb.js');
const generalRouter = express.Router();

// Task 1: Get the book list available in the shop
generalRouter.get('/books', (req, res) => {
    const bookList = Object.values(books).map((book) => ({
        title: book.title,
        author: book.author,
    }));
    res.status(200).json(bookList);
});

// Task 2: Get the books based on ISBN
generalRouter.get('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    if (books[isbn]) {
        res.status(200).json(books[isbn]);
    } else {
        res.status(404).json({ message: 'Book not found.' });
    }
});

// Task 3: Get all books by Author
generalRouter.get('/author/:author', (req, res) => {
    const { author } = req.params;
    const authorBooks = Object.values(books).filter(
        (book) => book.author.toLowerCase() === author.toLowerCase()
    );
    if (authorBooks.length > 0) {
        res.status(200).json(authorBooks);
    } else {
        res.status(404).json({ message: 'No books found for this author.' });
    }
});

// Task 4: Get all books based on Title
generalRouter.get('/title/:title', (req, res) => {
    const { title } = req.params;
    const titleBooks = Object.values(books).filter(
        (book) => book.title.toLowerCase() === title.toLowerCase()
    );
    if (titleBooks.length > 0) {
        res.status(200).json(titleBooks);
    } else {
        res.status(404).json({ message: 'No books found with this title.' });
    }
});

// Task 10: Get all books (using a simplified approach)
generalRouter.get('/books/all', (req, res) => {
  try {
    // Directly send the entire books object as an array
    const allBooks = Object.values(books);
    res.status(200).json(allBooks);  // Send the array of books as response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books.' });
  }
});


// Task 11: Search by ISBN (using Promises)
generalRouter.get('/books/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  const findBookByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
      const book = Object.values(books).find((b) => b.isbn === isbn);
      if (book) resolve(book);
      else reject('Book not found.');
    });
  };

  findBookByISBN(isbn)
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ message: error }));
});

// Task 12: Search by Author
generalRouter.get('/books/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();

  const booksByAuthor = Object.values(books).filter((b) =>
    b.author.toLowerCase().includes(author)
  );

  if (booksByAuthor.length > 0) {
    res.status(200).json(booksByAuthor);
  } else {
    res.status(404).json({ message: 'No books found by this author.' });
  }
});

// Task 13: Search by Title
generalRouter.get('/books/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();

  const booksByTitle = Object.values(books).filter((b) =>
    b.title.toLowerCase().includes(title)
  );

  if (booksByTitle.length > 0) {
    res.status(200).json(booksByTitle);
  } else {
    res.status(404).json({ message: 'No books found with this title.' });
  }
});

module.exports = generalRouter;






