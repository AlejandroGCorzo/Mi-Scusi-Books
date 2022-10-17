export default function onChange(e, newBook, setNewBook, author, setAuthor) {
  if (e.target.name === "author") {
    setNewBook({
      ...newBook,
      [e.target.name]: [...newBook[e.target.name], author],
    });
    setAuthor("");
    console.log(author);
    return;
  }
  setNewBook({ ...newBook, [e.target.name]: e.target.value });
}
