const { Router } = require("express");
const bookSchema = require("../models/books");
const Category = require("../models/category");
const bookRouter = Router();
const { protect } = require("../middleware/protect");
const filterTypeOne = [
  "name",
  "editorial",
  "price",
  "format",
  "language",
  "ISBN",
  "rating",
  "stock",
];
const filterTypeTwo = ["author", "category", "rating", "reviews"];

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
    } = req.body;
    let theme = await Category.find();
    const id = theme[0]._id;
    // console.log(id);

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
        rating: 0,
        stock,
        reviews: [],
        image,
        unitSold: 0,
        deleted: false,
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

//get filter
// valid filter type One  name || editorial || price || format || language || ISBN || rating || stock
// valid filter type Two author || category || rating || reviews

// bookRouter.get("/filter", async (req, res) => {
//   const { type, value } = req.query;
//   let filtro = [
//     type.split("-").join(" ").toLowerCase(),
//     value.split("-").join(" ").toLowerCase(),
//   ];

//   try {
//     if (filterTypeOne.includes(type)) {
//       let data = await bookSchema
//         .find({ [filtro[0]]: { $regex: filtro[1], $options: "i" } })
//         .where({ deleted: false })
//         .select("-deleted");
//       data.length === 0
//         ? res.status(404).json({ msg: `No books were found with this ${type}` })
//         : res.json(data);
//     } else if (filterTypeTwo.includes(type)) {
//       let data = await bookSchema
//         .find({ [filtro[0]]: { $all: [filtro[1]] } })
//         .where({ deleted: false })
//         .select("-deleted");
//       data.length === 0
//         ? res.status(404).json({ msg: `No books were found with this ${type}` })
//         : res.json(data);
//     } else res.status(400).send({ msg: `filter ${type} type does not exist` });
//   } catch (e) {
//     res.status(400).send({ msg: e.message });
//   }
// });

//new filter

bookRouter.get("/filter", async (req, res) => {
  const filters = req.body;
  let filtered = await bookSchema.find({ deleted: false }).select("-deleted");

  try {
    for (const filter in filters) {
      //si es array (autor o categoria filtro)
      if (!filters[filter]) {
        continue;
      }
      if (Array.isArray(filters[filter])) {
        for (const f of filters[filter]) {
          filtered = filtered.filter((el) => {
            return el[filter].includes(f);
          });
        }
      } else {
        filtered = filtered.filter((el) => el[filter] === filters[filter]);
      }
    }

    return res.status(200).json(filtered);
  } catch (e) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
});

//get allBooks
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

//get book especifict
bookRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ error: "id is required" });
  try {
    const book = await bookSchema
      .findById(id)
      .where({ deleted: false })
      .select("-deleted");
    if (!book) res.status(404).json({ error: "Book doesn't exist" });
    // if (book.deleted) res.status(404).json();

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

//soft-delete books
bookRouter.put("/delete/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "An id is needed" });
  }
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
});

//update book
bookRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const value = Object.values(data);

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
