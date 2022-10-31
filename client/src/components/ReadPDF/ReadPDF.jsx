import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

const url =
  "https://res.cloudinary.com/scusi-books/image/upload/v1667227678/booksCovers/d5oc5udi3qa3od06l97s.pdf";

export default function Test() {
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
    changePage(-2);
  }

  function nextPage() {
    changePage(2);
  }

  return (
    <>
      <div className="main">
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
          <Page pageNumber={pageNumber + 1} />
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

