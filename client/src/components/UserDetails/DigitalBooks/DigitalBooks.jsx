import { React, useState, useEffect } from "react";
import ReadPDF from "../../ReadPDF/ReadPDF";
import './DigitalBooks.css'
import CancelIcon from '@mui/icons-material/Cancel';

// function EachDigitalBook(props) {
//   //   console.log(props);
//   return (
//     <div>
//       <div>
//         <span>Items:</span>
//         {props.books.map((el) => (
//           <div>
//             <span>Name: {el.name}</span>
//             <span>Book format: {el.format}</span>
//             <span>Amount: {el.amount}</span>
//             <span>Unit price: {el.price}</span>
//           </div>
//         ))}
//       </div>
//       <div>
//         <h1>pdf</h1>
//         <ReadPDF/>
//       </div>
//     </div>
//   );
// }


export default function DigitalBooks({ loggedUser }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  function ocultar() {
    var idContentVentana = document.getElementById("idContentVentana");

    if (idContentVentana.style.display == "none") {
      idContentVentana.style.display = "flex";
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else {
      idContentVentana.style.display = "none";
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }
      
  }

  const handleClick = (e) => {
    e.preventDefault();
    setId(e.target.name);
    setOpen(true);
    ocultar();
  };

  const handleClose = (e) => {
    e.preventDefault();
    setId("");
    setOpen(false);
    ocultar();
  };

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {}, [id]);

  return (
    <div >
      {!open && loggedUser &&
        loggedUser.buyedBooks
          ?.filter((b) => b.format === "digital")
          .map((b) => (
            <div className='digitalBookContainer' key={b}>
              <div className='digitalBookImage'>
                <img
                  src={b.image}
                  alt="No se pudo cargar imagen"
                  height={"50px"}
                />
              </div>
              <div className='digitalBookName'>
                <span>{capitalizarPrimeraLetra(b.name)}</span>
              </div>
              <div className='digitalBookButton'>
                <button
                  className="buttonRead"
                  disabled={open}
                  onClick={(e) => handleClick(e)}
                  name={`${b.id}`}
                >
                  Read
                </button>
              </div>
            </div>
          ))}

        
        <div
        id="idContentVentana"
        className="window-notice"
        style={{ display: "none" }}
      >
        <div className="contentBokk">
        <div className="contentClose">
          {open && <button className="buttonFavX" onClick={(e) => handleClose(e)}><CancelIcon className="favColor"/></button>}
          </div>
          <div>
            {open && <ReadPDF id={id} />}
          </div>
        
        </div>

      </div>


    </div>
  );
}
