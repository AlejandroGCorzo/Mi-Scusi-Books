import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function SubmitButtonStack({
  handleClickOpen,
  errorHandler,
  newBook,
  edit,
  categories,
}) {
  // console.log(categories[newBook.categories[0]][newBook.categories[1]]);
  function ifCategories() {
    return newBook.categories.length === 3
      ? false
      : newBook.categories.length === 2
      ? typeof categories[newBook.categories[0]][newBook.categories[1]] ===
        "object"
      : true;
  }

  return (
    <Stack className="CreateBookConfirmationStack" direction="row" spacing={2}>
      {!edit ? (
        <>
          <Button
            name="reset"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleClickOpen}
          >
            Reset fields
          </Button>
          
          <Button
            name="create"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleClickOpen}
            style={{marginTop:"6px", marginBottom:"6px"}}
            disabled={
              errorHandler.edition.length !== 0 ||
              errorHandler.price.length !== 0 ||
              errorHandler.synopsis.length !== 0 ||
              errorHandler.ISBN.length !== 0 ||
              errorHandler.stock.length !== 0 ||
              !newBook.title ||
              !newBook.title ||
              !newBook.author.length ||
              !newBook.editorial ||
              !newBook.edition.length ||
              !newBook.price ||
              // newBook.categories.length < 2 ||
              !newBook.synopsis ||
              !newBook.format ||
              !newBook.language ||
              !newBook.ISBN ||
              !newBook.stock ||
              !newBook.image ||
              ifCategories()
            }
          >
            Create Book
          </Button>
        </>
      ) : (
        <Button
          name="update"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleClickOpen}
          style={{marginTop:"6px", marginBottom:"6px"}}
          disabled={
            errorHandler.edition.length !== 0 ||
            errorHandler.price.length !== 0 ||
            errorHandler.synopsis.length !== 0 ||
            errorHandler.ISBN.length !== 0 ||
            !newBook.title ||
            !newBook.title ||
            !newBook.author.length ||
            !newBook.editorial ||
            !newBook.edition.length ||
            !newBook.price ||
            newBook.categories.length < 2 ||
            !newBook.synopsis ||
            !newBook.format ||
            !newBook.language ||
            !newBook.ISBN
          }
        >
          Update Book
        </Button>
      )}
    </Stack>
  );
}
