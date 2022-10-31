import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";

export default function ImgSelector({ pdf, setPdf, newBook, setNewBook }) {
  // // // // //
  function uploadImage(e) {
    e.preventDefault(e);
    const formImgData = new FormData();
    formImgData.append("file", e.target.files[0]);
    formImgData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_BOOK_COVER_PRESET
    );
    axios
      .post(
        "https://api.cloudinary.com/v1_1/scusi-books/image/upload/",
        formImgData
      )
      .then((response) => {
        // console.log(response);
        setNewBook({ ...newBook, image: response.data.secure_url });
      });
  }
  function uploadPdf(e) {
    e.preventDefault(e);
    const formPdfData = new FormData();
    setPdf({ file: e.target.files[0] });
    formPdfData.append("file", e.target.files[0]);
    formPdfData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_PDF_UPLOAD
    );
    axios
      .post(
        "https://api.cloudinary.com/v1_1/scusi-books/image/upload/",
        formPdfData
      )
      .then((response) => {
        // console.log(response);
        setNewBook({ ...newBook, pdf: response.data.secure_url });
      });
  }
  // // // // //
  return (
    <>
      <span>Select files: </span>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={uploadImage} />
        <PhotoCamera />
      </IconButton>
      {newBook.format === "digital" && (
        <>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept=".pdf" type="file" onChange={uploadPdf} />
            <PictureAsPdfIcon />
          </IconButton>
          <span style={{ color: "black" }}>{pdf.file?.name}</span>
        </>
      )}

      {/* <Button
        // className="ImgSelectorStackButton"
        variant="contained"
        component="label"
        disabled={!imgSelected.file?.name}
      >
        Upload cover
        <input hidden accept="image/*" onClick={uploadImage} />
      </Button> */}
    </>
  );
}
