export default function onChange(e, newBook, setNewBook, author, setAuthor) {
  if (e.target.name === "author") {
    setNewBook({
      ...newBook,
      [e.target.name]: [...newBook[e.target.name], author.toLowerCase()],
    });
    setAuthor("");
    return;
  }
  if (e.target.name === "synopsis") {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
    return;
  }
  setNewBook({ ...newBook, [e.target.name]: e.target.value.toLowerCase() });
}
