import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { getLoggedUserData } from "../../redux/StoreUsers/usersSlice";

export default function ReadPDF({ id }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }
  function previousPage() {
    console.log(pageNumber);
    if (pageNumber === numPages) changePage(-1);
    else changePage(-2);
  }
  function nextPage() {
    if (pageNumber === numPages - 1) changePage(1);
    else changePage(2);
    console.log("actual ", pageNumber);
    console.log("actual siguiente ", pageNumber + 1);
  }
  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

  // const { loggedUser } = useSelector((state) => state.users);
  const [url, setUrl] = useState("");

  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");

  const handleClick = async (e) => {
    // setSelectBook(e.target.name);
    axios
      .get(`/user/buyedBooks/${id}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((r) => setUrl(r.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <>
      {/* <div>
        {loggedUser?.buyedBooks?.map((b, i) => {
          return (
            <button  name={b} onClick={(e) => handleClick(e)}>
              {b}
            </button>
          );
        })}
        {console.log(url)}
      </div> */}

      <div className="main">
        <Document file={url ? url : ""} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
          {pageNumber === numPages ? (
            <></>
          ) : (
            <Page pageNumber={pageNumber + 1} />
          )}
          {/* <Page pageNumber={pageNumber + 1} /> */}
        </Document>
        <div>
          <div className="pagec">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
          <div className="buttonc">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="Pre"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
