import axios from "axios";

export default async function handleUpdate(
  e,
  newBook,
  history,
  bookId,
  accessToken
) {
  e.preventDefault();
  console.log("token", accessToken);
  newBook = { ...newBook, name: newBook.title };
  delete newBook.title;
  try {
    const updated = await axios.put(`/books/${bookId}`, newBook, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    history.push(`/book_details/${bookId}`);
  } catch (e) {
    alert("maliosal");
  }
}
