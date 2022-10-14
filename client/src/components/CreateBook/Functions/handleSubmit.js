import axios from 'axios';

export default function handleSubmit(e, newBook, history) {
  e.preventDefault();
  newBook = { ...newBook, name: newBook.title };
  delete newBook.title;
  console.log('SUBMITEADO', newBook);
  axios
    .post('http://localhost:9000/books', newBook)
    .then((response) => {
      history.push(`/book_details/${response.data._id}`);
    })
    .catch((e) => console.log(e));
}
