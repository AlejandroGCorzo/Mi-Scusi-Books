import axios from "axios";
import { getAllBooks, getBookById } from "./booksSlice.js";

/* https://rickandmortyapi.com/api/character */

export const getChars = () => (dispatch) => {
  //   axios('https://rickandmortyapi.com/api/character')
  //     .then((resolve) => dispatch(getAllCharacters(resolve.data.results)))
  //     .catch((error) => console.log(error));
  dispatch(
    getAllBooks([
      {
        _id: 485926152,
        name: "The Lion, the Witch and the Wardrobe (The Chronicles of Narnia)",
        author: ["C. S. Lewis"],
        editorial: "HarperCollins",
        price: 8.99,
        category: ["fantasy", "novel", "for children"],
        synopsis:
          "During World War II, four English sibleditorings are sent to a house in the countryside where they will be safe from bombing. One day, Lucy, the younger sister, discovers a closet that transports her to a magical world called Narnia. After returning, she soon returns to Narnia with her siblings, Peter, Edmund and Susan. There, the four of them will join the magical lion Aslan and fight against the White Witch.",
        format: "hardcover",
        edition: 2008,
        language: "english",
        ISBN: 9780064404990,
        rating: 4.8,
        stock: 25,
        reviews: [
          {
            _id: 413294398,
            text: "Aguante narnia",
            votes: { upvotes: 10, downvotes: 5 },
            user: "elchirolas",
          },
          {
            _id: 413294312398,
            text: "Libro mas malo",
            votes: { upvotes: 3, downvotes: 5 },
            user: "firu",
          },
        ],
        image:
          "https://m.media-amazon.com/images/I/51erHMLhIzL._SX334_BO1,204,203,200_.jpg",
      },
    ])
  );
};

export const getDetail = (id) => (dispatch) => {
  dispatch(
    getBookById(Number(id))
  );
};
