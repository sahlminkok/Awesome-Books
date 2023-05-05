class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.loadBooks();
  }

  addBook(book) {
    this.books.push(book);
    this.saveBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveBooks();
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  loadBooks() {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books) {
      this.books = books;
      this.displayBooks();
    }
  }

  displayBooks() {
    const bookList = document.querySelector('#book-list');
    bookList.innerHTML = '';
    for (let i = 0; i < this.books.length; i += 1) {
      const book = this.books[i];
      const li = document.createElement('li');
      li.classList.add('book');
      const pTag = document.createElement('p');
      pTag.innerHTML = `
        <span>"${book.title}"</span> by
        <span>${book.author}</span>
        `;
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';
      deleteBtn.classList.add('remove');
      deleteBtn.addEventListener('click', () => {
        this.removeBook(i);
      });
      li.appendChild(pTag);
      li.appendChild(deleteBtn);
      bookList.appendChild(li);
    }
  }
}

const library = new Library();

const addBookForm = document.querySelector('#add-book-form');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const book = new Book(titleInput.value, authorInput.value);
  library.addBook(book);
  titleInput.value = '';
  authorInput.value = '';
});

const list = document.querySelector('#list');
const addNew = document.querySelector('#addNew');
const contact = document.querySelector('#contact');
const listBtn = document.querySelector('#list-btn');
const addNewBtn = document.querySelector('#addNew-btn');
const contactBtn = document.querySelector('#contact-btn');

list.classList.remove('hidden');
addNew.classList.add('hidden');
contact.classList.add('hidden');

listBtn.addEventListener('click', () => {
  addNew.classList.add('hidden');
  contact.classList.add('hidden');
  list.classList.remove('hidden');
});

addNewBtn.addEventListener('click', () => {
  list.classList.add('hidden');
  addNew.classList.remove('hidden');
  contact.classList.add('hidden');
});

contactBtn.addEventListener('click', () => {
  list.classList.add('hidden');
  contact.classList.remove('hidden');
  addNew.classList.add('hidden');
});

const DateTime = new Date();
document.querySelector('.time').innerHTML = DateTime;
