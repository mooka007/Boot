class Book {
    static getAll() {
        return books;
    }

    static getById(id) {
        return books.find(book => book.id === parseInt(id));
    }

    static create(bookData) {
        const newBook = {
            id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
            ...bookData
        };
        books.push(newBook);
        return newBook;
    }

    static update(id, bookData) {
        const index = books.findIndex(book => book.id === parseInt(id));
        if (index === -1) return null;
        
        books[index] = { ...books[index], ...bookData };
        return books[index];
    }

    static delete(id) {
        const index = books.findIndex(book => book.id === parseInt(id));
        if (index === -1) return false;
        
        books.splice(index, 1);
        return true;
    }
}

let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publishedYear: 1925
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publishedYear: 1960
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        publishedYear: 1949
    }
];


module.exports = Book;

