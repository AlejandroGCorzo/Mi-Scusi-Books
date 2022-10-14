import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCategories } from '../../redux/StoreBooks/booksActions';
import CategoriesSelector from './CategoriesSelector/CategoriesSelector.jsx';
import ImgSelector from './ImgSelector/ImgSelector.jsx';
import NewBookPreview from './NewBookPreview/NewBookPreview.jsx';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  deleteCategory,
  handleErrors,
  onChange,
  handleSubmit,
} from './Functions/exporter.js';
import './CreateBook.css';

export default function CreateBook() {
  const history = useHistory();
  const dispatch = useDispatch();
  // // // // // //
  const emptyBook = {
    title: '',
    author: [],
    editorial: '',
    edition: '',
    price: '',
    categories: [],
    synopsis: '',
    format: '',
    language: '',
    ISBN: '',
    stock: '',
    image: '',
  };
  const [newBook, setNewBook] = useState(emptyBook);
  const [errorHandler, setErrorHandler] = useState({
    edition: '',
    price: '',
    synopsis: '',
    ISBN: '',
    stock: '',
  });
  const [open, setOpen] = useState({});
  const [author, setAuthor] = useState('');
  const [catSel, setCatSel] = useState('Select theme');
  const [imgSelected, setImgSelected] = useState({ file: {}, url: '' });
  const defaultOptions = {
    format: 'Select format',
    language: 'Select language',
  };
  const [options, setOptions] = useState(defaultOptions);
  const { categories } = useSelector((state) => state.books);
  // // // // // //
  function handleChange(e) {
    onChange(e, newBook, setNewBook, author, setAuthor);
    if (['stock', 'ISBN', 'edition', 'price'].includes(e.target.name))
      handleErrors(e, errorHandler, setErrorHandler);
  }
  const handleClickOpen = (e) => {
    setOpen({ [e.target.name]: true });
  };

  const handleClose = () => {
    setOpen({});
  };
  // // // // // //
  useEffect(() => {
    if (!Object.keys(categories).length) dispatch(getCategories());
  }, [dispatch]);
  // // // // // //
  return (
    <div className="bookCreationForm">
      <div className="bookCreationFormInput">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <span>Title: </span>
            <input
              type="text"
              placeholder="Write here"
              name="title"
              value={newBook.title}
              onChange={handleChange}
            />
          </div>
          <span></span>
          <div>
            <span>Author: </span>
            <input
              type="text"
              placeholder="Write here"
              name="author"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13 && e.target.name === 'author')
                  return onChange(e, newBook, setNewBook, author, setAuthor);
              }}
            />
            <button
              name="author"
              disabled={!author.length}
              onClick={handleChange}
            >
              add
            </button>
          </div>
          <span></span>
          <div>
            <span>Editorial: </span>
            <input
              type="text"
              placeholder="Write here"
              name="editorial"
              value={newBook.editorial}
              onChange={handleChange}
            />
          </div>
          <span></span>
          <div>
            <span>Edition: </span>
            <input
              type="text"
              placeholder="Year edition"
              name="edition"
              value={newBook.edition}
              onChange={handleChange}
            />
          </div>
          <span>{errorHandler.edition}</span>
          <div>
            <span>Price: </span>
            <input
              type="text"
              placeholder="Numbers only"
              name="price"
              value={newBook.price}
              onChange={handleChange}
            />
          </div>
          <span>{errorHandler.price}</span>
          <CategoriesSelector
            newBook={newBook}
            setNewBook={setNewBook}
            catSel={catSel}
            setCatSel={setCatSel}
            categories={categories}
          />
          <div>
            <span>Synopsis: </span>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Write here"
              style={{ width: 200 }}
              name="synopsis"
              value={newBook.synopsis}
              onChange={handleChange}
            />
          </div>
          <span>{errorHandler.synopsis}</span>
          <div>
            <span>Format: </span>
            <select
              value={options.format}
              onChange={(e) => {
                setNewBook({ ...newBook, format: e.target.value });
                setOptions({ ...options, format: e.target.value });
              }}
            >
              <option disabled>Select format</option>
              <option>Digital</option>
              <option>Hardcover</option>
              <option>Paperback</option>
            </select>
          </div>
          <div>
            <span>Language: </span>
            <select
              value={options.language}
              onChange={(e) => {
                setNewBook({ ...newBook, language: e.target.value });
                setOptions({ ...options, language: e.target.value });
              }}
            >
              <option disabled>Select language</option>
              <option>English</option>
              <option>Spanish</option>
            </select>
          </div>
          <div>
            <span>ISBN: </span>
            <input
              type="text"
              placeholder="Numbers only"
              name="ISBN"
              value={newBook.ISBN}
              onChange={handleChange}
              maxLength={13}
            />
          </div>
          <span>{errorHandler.ISBN}</span>
          <div>
            <span>Stock: </span>
            <input
              type="text"
              placeholder="Numbers only"
              name="stock"
              value={newBook.stock}
              onChange={handleChange}
            />
          </div>
          <span>{errorHandler.stock}</span>
          <div>
            <ImgSelector
              imgSelected={imgSelected}
              setImgSelected={setImgSelected}
              newBook={newBook}
              setNewBook={setNewBook}
            />
          </div>
          {/* STACK BOTONES RESET Y CREATE */}
          <Stack
            className="CreateBookConfirmationStack"
            direction="row"
            spacing={2}
          >
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
                errorHandler.edition ||
                errorHandler.price ||
                errorHandler.synopsis ||
                errorHandler.ISBN ||
                errorHandler.stock ||
                !newBook.title ||
                !newBook.title ||
                !newBook.author.length ||
                !newBook.editorial ||
                !newBook.edition ||
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
          </Stack>
          {/* CONFIRM RESET DIALOG */}
          <Dialog
            open={open.reset ? true : false}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirm Reset</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to reset all fields?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleClose();
                  setNewBook(emptyBook);
                  setAuthor('');
                  setOptions(defaultOptions);
                  setCatSel('Select theme');
                }}
                autoFocus
              >
                Confirm
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
          {/* CONFIRM CREATE DIALOG */}
          <Dialog
            open={open.create ? true : false}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Confirm creation of {newBook.title}?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Check that everything is OK and click Confirm. Else click
                Cancel.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Confirm
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
          {/*  */}
        </form>
      </div>
      {/*  */}
      <div>
        <NewBookPreview
          newBook={newBook}
          setNewBook={setNewBook}
          deleteCategory={() => deleteCategory(newBook, setNewBook, setCatSel)}
        />
      </div>
    </div>
  );
}
