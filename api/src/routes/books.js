const { Router } = require("express");
const bookSchema = require("../models/books");
const Category = require("../models/category");
const bookRouter = Router();
const { protect } = require("../middleware/protect");

//post book
bookRouter.post("/", async (req, res) => {
  let book = {};
  try {
    const {
      name,
      author,
      editorial,
      price,
      categories,
      synopsis,
      format,
      edition,
      language,
      ISBN,
      stock,
      image,
      url
    } = req.body;
    console.log(req.body);
    let theme = await Category.find();
    const id = theme[0]._id;

    //Check if it has 3 cats
    if (categories.length === 3) {
      theme[0].theme[categories[0]][categories[1]][categories[2]]++;
    }
    if (categories.length === 2) {
      theme[0].theme[categories[0]][categories[1]]++;
    }
    if (categories.length === 1) {
      theme[0].theme[categories[0]]++;
    }

    if (
      name &&
      author &&
      editorial &&
      price &&
      categories &&
      synopsis &&
      format &&
      edition &&
      language &&
      ISBN &&
      stock &&
      image
    ) {
      book = {
        name,
        author,
        editorial,
        price,
        category: categories,
        synopsis,
        format,
        edition,
        language,
        ISBN,
        stock,
        reviews: [],
        rating: [],
        image,
        unitSold: 0,
        deleted: false,
        url
      };
    } else
      return res
        .status(400)
        .send("the required fields do not meet the requirements");
    const addBook = bookSchema(book);
    await addBook.save();
    await Category.where({ _id: id }).update({
      $set: { theme: theme[0].theme },
    });
    return res.status(200).json(addBook);
  } catch (e) {
    return res.status(400).json({ msg: e + "" });
  }
});

//get top 10 best selling books
bookRouter.get("/", async (req, res) => {
  try {
    let data = await bookSchema
      .find()
      .where({ deleted: false })
      .sort({ unitSold: -1 })
      .limit(10)
      .select("-deleted");
    res.json(data);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});


bookRouter.post("/filter", async (req, res) => {
  const filters = req.body;
  let filtered = await bookSchema.find({ deleted: false }).select("-deleted");

  try {
    for (const filter in filters) {
      //si es array (autor o categoria filtro)
      if (!filters[filter]) {
        continue;
      }
      if (filter === "stock") {
        filtered = filtered.filter((el) => el.stock > 0);
      }
      if (filter === "ISBN") {
        filtered = filtered.filter((el) => el[filter] == filters[filter]);
      }
      if (filter === "category") {
        for (const f of filters[filter]) {
          filtered = filtered.filter((el) => {
            return el[filter].includes(f);
          });
        }
      }
      if (filter === "author") {
        let searchAuthor;
        filters[filter].forEach((el) => {
          searchAuthor = el.split(" ");
        });
        for (const author of searchAuthor) {
          filtered = filtered.filter((book) => {
            return book.author.some((el) => el.includes(author.toLowerCase()));
          });
        }
      }
      if (filter === "editorial") {
        filtered = filtered.filter((book) =>
          book.editorial.includes(filters[filter].toLowerCase())
        );
      }
      if (filter === "format") {
        filtered = filtered.filter(
          (book) => book.format === filters[filter].toLowerCase()
        );
      }
      if (filter === "language") {
        filtered = filtered.filter((book) => book.language === filters[filter]);
      }
      if (filter === "name") {
        filtered = filtered.filter((book) =>
          book.name.includes(filters[filter])
        );
      }
    }
    return res.status(200).json(filtered);
  } catch (e) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
});

//get allBooks-
bookRouter.get("/allBooks", async (req, res) => {
  try {
    const books = await bookSchema
      .find()
      .where({ deleted: false })
      .select("-deleted");
    res.status(200).json(books);
  } catch (e) {
    res.status(400).json({ msg: e });
  }
});

//get book especifict -> AGREGAR EL PROMEDI DE RATING Y COMPLETAR LOS DEMAS CAMPOS
bookRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ error: "id is required" });
  try {
    const book = await bookSchema
      .findById(id)
      .where({ deleted: false })
      .select("-deleted")
      .populate("reviews");
    if (!book) res.status(404).json({ error: "Book doesn't exist" });
    res.status(200).json(book);
  } catch (e) {
    next(e);
  }
});

bookRouter.delete("/destroy/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "An id is needed" });
  }
  try {
    const book = await bookSchema.findById(id);
    const bookCategory = book.category;
    let theme = await Category.find();
    const themeId = theme[0]._id;
    book.deleted = true;

    if (bookCategory.length === 3) {
      theme[0].theme[bookCategory[0]][bookCategory[1]][bookCategory[2]]--;
    }
    if (bookCategory.length === 2) {
      theme[0].theme[bookCategory[0]][bookCategory[1]]--;
    }
    if (bookCategory.length === 1) {
      theme[0].theme[bookCategory[0]]--;
    }
    await Category.where({ _id: themeId }).update({
      $set: { theme: theme[0].theme },
    });
    const deleted = await bookSchema.deleteOne({ _id: id });
    if (deleted) {
      return res.status(200).json({ msg: "Book fully deleted" });
    }
  } catch (e) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
});

//soft-delete books -> protegida, solo admin y seller pueden borrar
bookRouter.put("/delete/:id", protect, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "An id is needed" });
  }
  if (req.user && (req.user.type === "admin" || req.user.type === "seller")) {
    try {
      const book = await bookSchema.findById(id);
      if (!book) {
        return res.status(400).json({ msg: "Book doesn't exist" });
      }
      const bookCategory = book.category;
      let theme = await Category.find();
      const themeId = theme[0]._id;
      book.deleted = true;

      if (bookCategory.length === 3) {
        theme[0].theme[bookCategory[0]][bookCategory[1]][bookCategory[2]]--;
      }
      if (bookCategory.length === 2) {
        theme[0].theme[bookCategory[0]][bookCategory[1]]--;
      }
      if (bookCategory.length === 1) {
        theme[0].theme[bookCategory[0]]--;
      }

      await book.save();
      await Category.where({ _id: themeId }).update({
        $set: { theme: theme[0].theme },
      });

      return res.status(200).json({ msg: "Book deleted" });
    } catch (e) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
  } else {
    res.status(400).json({ msg: "Not authorized" });
  }
});

//update book -> protegida, solo admin y seller pueden modificar libro
bookRouter.put("/:id", protect, async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const value = Object.values(data);
  console.log('data', data)
  if (req.user && (req.user.type === "admin" || req.user.type === "seller")) {
    if (value.some((val) => val.length == 0))
      res.json({ error: "they can't send empty comps" });
    if (!id) return res.status(400).send({ error: "id is required" });
    if (!data)
      return res
        .status(400)
        .send({ error: "information per body required to update " });

    try {
      await bookSchema.updateOne({ _id: id }, { $set: data });
      res.send("Books updated successfully!");
    } catch (e) {
      next(e);
    }
  } else {
    res.status(400).json({ msg: "Not authorized" });
  }
});

//update stock -> protegida, solo admin y seller pueden cambiar el stock
bookRouter.put("/stock/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  if (req.user && (req.user.type === "admin" || req.user.type === "seller")) {
    try {
      const book = await bookSchema.findById(id);
      if (!book) {
        return res.status(400).json({ msg: "Book not found" });
      }

      const sumStock = book.stock + Number(amount);
      const newStock = await bookSchema.findByIdAndUpdate(id, {
        $set: { stock: sumStock },
      });
      return res.status(200).json({ newStock });
    } catch (e) {
      return res.status(400).send(e);
    }
  }
});
//midleware error handling
bookRouter.use((error, req, res, next) => {
  if (error.name === "CastError")
    res.status(400).send({ error: "the data sent is malformed " });
  else if (error.name === "TypeError")
    res.status(400).json({ error: error + "" });
  else res.status(500).end();
});

module.exports = bookRouter;
