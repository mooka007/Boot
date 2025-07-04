const allBooks = [
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        image: "https://example.com/harry_potter.jpg", 
        alreadyRead: true
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://example.com/hobbit.jpg", 
        alreadyRead: false
    }
];

const listBooksSection = document.querySelector(".listBooks")

allBooks.forEach( book=>{
    const bookDiv = document.createElement("div");
    const bookDetail = document.createElement("p");
    bookDetail.textContent = `${book.title} written by ${book.author}`

    if (book.alreadyRead){
        bookDetail.style.color = "red";
    }

    const img = document.createElement("img")
    img.src = book.image;
    img.style.width = "!00px";

    bookDiv.appendChild(img)
    bookDiv.appendChild(bookDetail);

    listBooksSection.appendChild(bookDiv)
})