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

     //get filter
    // valid filter types name || editorial || price || format || language || ISBN || rating || stock

  bookRouter.get('/filter', async (req, res)=>{
    const { type ,value } = req.query;
    let filtro = [type, value];
   
    try {
    if(type == "name" || type == "price" || type == "editorial" || type == "format" || type == "edition" || type == "languaje" || type == "ISBN" || type ==  "rating" || type == "stock"){
    let data = await bookSchema.find({[filtro[0]]:filtro[1]});

    if (data.length === 0 ){
      res.status(404).json({msg:`No books were found with this ${type}`})
    } else res.json(data);

   } else res.status(400).send({msg: `filter ${type} type does not exist`})
  
  }catch (e) {
   res.status(400).send({ msg: e.message});
   }
})


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
  bookRouter.get('/:id', async(req,res, next) => {
    const { id } = req.params;
    if(!id) res.status(400).json({error: 'id is required'})
    try{
     const book = await bookSchema.findById(id)
     if (!book) res.status(404).json({msg: "no found books"})

      res.status(200).json(book);
    } catch(e){
      next(e)
    }
  })



  //  update book 
bookRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;  
 if (!id) return res.status(400).send({ error: "id is required" });
 if (!data) return res.status(400).send({error : "information per body required to update "});

 try {
    await bookSchema.updateOne({ _id: id }, { $set: data });
    res.send("Books updated successfully!");
  } catch (e) {
    next(e)
  }
});

//midleware error handling
bookRouter.use((error, req, res, next)=>{
    // console.error(error)
   if (error.name === "CastError") {
    res.status(400).send({error:"the data sent is malformed "});
   }else res.status(500).end();
})



module.exports = bookRouter;