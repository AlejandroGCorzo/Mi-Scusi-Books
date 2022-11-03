import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { getLoggedUserData } from "../../redux/StoreUsers/usersSlice";
import HTMLFlipBook from "react-pageflip";
import "./libro.scss"

export default function ReadPDF({id}) {
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
    if(pageNumber === numPages) changePage(-1)
    else changePage(-2);
  }
  function nextPage() {
    if(pageNumber === numPages-1) changePage(1)
    else changePage(2);
    console.log('actual ',pageNumber);
    console.log('actual siguiente ',pageNumber+1);
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
    handleClick()
  }, []);


  const pageNumbers = [];

  for (let i = 2; i <= numPages; i++) {
      pageNumbers.push(i);
  }
  

  const PageCover = React.forwardRef((props, ref) => {
    return (
      <div className="page page-cover" ref={ref} data-density="hard">
        <div className="page-content">
          <h2>{props.children}</h2>
        </div>
      </div>
    );
  });
  
  const Pagex = React.forwardRef((props, ref) => {

    return (
      <div className="page" ref={ref}>
        <div className="page-content">
          <div className="page-image">
              <div>
                <Page
                width={props.width}
                height={props.height}
                pageNumber={props.number}/>
              </div>
            </div>
        </div>
      </div>
    );
  });

  function dibujoBookPorResolucion(){
    if (window.innerWidth >= 1900) {
      return(<HTMLFlipBook
        width={"618"}
        height={"880"}
        maxShadowOpacity={0.8}
        showCover={true}
        >
          <Pagex number={1} width={618} height={880}></Pagex>
          {pageNumbers?.map(e => {
            return(<Pagex key={e} number={e} width={618} height={880}></Pagex>)
          })}
          <PageCover></PageCover>
      </HTMLFlipBook>)
    } else if (window.innerWidth > 914 && window.innerWidth < 1900){
      return(<HTMLFlipBook
      width={"412"}
      height={"580"}
      maxShadowOpacity={0.8}
      showCover={true}
      >
        <Pagex number={1} width={412} height={580}/>
        {pageNumbers?.map(e => {
          return(<Pagex key={e} number={e} width={412} height={580}></Pagex>)
        })}
        <PageCover></PageCover>
      </HTMLFlipBook>)
    }else if (window.innerWidth < 914){
      return(
        <HTMLFlipBook
        width={"360"}
        height={"500"}
        maxShadowOpacity={0.8}
        showCover={true}
        >
          <Pagex number={1} width={360} height={500}/>
          {pageNumbers?.map(e => {
            return(<Pagex key={e} number={e} width={360} height={500}></Pagex>)
          })}
          <PageCover>The</PageCover>
        </HTMLFlipBook>
      )
    }
  }

  return (
    <>
      <div className="main">
        <Document file={url ? url : ""} onLoadSuccess={onDocumentLoadSuccess}>
          {dibujoBookPorResolucion()}
        </Document>
      </div>
    </>
  );
}
