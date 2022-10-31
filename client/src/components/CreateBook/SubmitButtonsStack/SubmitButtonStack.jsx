import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function SubmitButtonStack({
  handleClickOpen,
  errorHandler,
  newBook,
  edit
}) {
  return (
    <Stack className="CreateBookConfirmationStack" direction="row" spacing={2}>
      {
        !edit ? 
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
            newBook.categories.length < 2 ||
            !newBook.synopsis ||
            !newBook.format ||
            !newBook.language ||
            !newBook.ISBN ||
            !newBook.stock ||
            !newBook.image
          }
        >
          Create Book
        </Button>
        </>
        : <Button
        name="update"
        variant="contained"
        endIcon={<SendIcon />}
        onClick={handleClickOpen}
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
      }
    </Stack>
  );
}
