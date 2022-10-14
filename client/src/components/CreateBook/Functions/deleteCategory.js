export function deleteCategory(newBook, setNewBook,setCatSel) {
  setNewBook({
    ...newBook,
    categories: newBook.categories.slice(0, newBook.categories.length - 1),
  });
  if (newBook.categories.length === 1) setCatSel('Select theme');
  if (newBook.categories.length === 2) setCatSel('Select category');
  if (newBook.categories.length === 3) setCatSel('Select subcategory');
}
