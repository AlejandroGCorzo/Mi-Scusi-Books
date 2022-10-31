import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";

export default function ImgSelectorUser({
  imgSelected,
  setImgSelected,
  changes,
  setChanges,
}) {
  // // // // //
  function uploadImage(e) {
    e.preventDefault(e);
    console.log(process.env.REACT_APP_CLOUDINARY_USER_PROFILE);
    const formImgData = new FormData();
    formImgData.append("file", imgSelected.file);
    formImgData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_USER_PROFILE
    );
    axios
      .post(
        "https://api.cloudinary.com/v1_1/scusi-books/image/upload/",
        formImgData
      )
      .then((response) => {
        console.log(response);
        setImgSelected({
          ...imgSelected,
          url: response.data.secure_url,
        });
        setChanges({ ...changes, image: response.data.secure_url });
      });
  }
  // // // // //
  return (
    <>
      <span>Select image: </span>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={(e) => {
            setImgSelected({
              ...imgSelected,
              file: e.target.files[0],
            });
          }}
        />
        <PhotoCamera />
      </IconButton>
      <span style={{ color: "black" }}>{imgSelected.file?.name}</span>
      <Button
        // className="ImgSelectorStackButton"
        variant="contained"
        component="label"
        disabled={!imgSelected.file?.name}
      >
        Upload Profile Pic
        <input hidden accept="image/*" onClick={uploadImage} />
      </Button>
    </>
  );
}
