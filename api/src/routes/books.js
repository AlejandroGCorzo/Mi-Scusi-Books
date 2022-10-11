const { Router } = require("express");
const bookSchema= require("../models/books");

const bookRouter = Router();

  //post book 
bookRouter.post('/', async (req, res) => {
    let book = {};
    try{
    const {name, author, editorial, price, category, synopsis, format, edition, language, ISBN, stock, image } = req.body;


     if (name.length > 5 && author && editorial && price && category && synopsis.length > 30 && format && edition &&  language && ISBN && stock && image) {
        book = {
          name,
          author,
          editorial,
          price,
          category,
          synopsis,
          format,
          edition,
          language,
          ISBN,
          "rating":0,
          stock,
          "reviews":[],
          image
        }
      }else res.status(400).send("the required fields do not meet the requirements")

      const addBook =  bookSchema(book);
      await addBook.save()
     res.status(200).json(addBook)
    } catch(e){
      res.status(400).json({msg:  e + ""})
    } 
  })

   
//   bookRouter.get('/filter', async (req, res)=>{
//     const typeFilter = req.query;
//  if(!typeFilter) res.status(400).send('filter type is required')
//   try {
//    await bookSchema.find({typeFilter});
//     res.json(bookSchema);
//   }catch (e) {
//    res.status(400).send({ msg: e.message  });
//    }
// })

    //get allBooks
  bookRouter.get('/allBooks', async(req,res) => {
    try{
     const books = await bookSchema.find()
        res.status(200).json(books);
    } catch(e){
      res.status(400).json({msg: e})
    }
  })

  //get book especifict 
  bookRouter.get('/:id', async(req,res) => {
    try{
      const { id } = req.params;
     const book = await bookSchema.findById({_id: id})
     res.status(200).json(book);
    } catch(e){
      res.status(404).json({msg: "no found books"})
    }
  })



  //  update book 
bookRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;  
 if (!id) return res.status(400).send({ msg: "id is required" });

 try {
    await bookSchema.updateOne({ _id: id }, { $set: data });
    res.send("Books updated successfully!");
  } catch (e) {
    res.status(400).send({ msg: e.message  });
  }
});




module.exports = bookRouter;