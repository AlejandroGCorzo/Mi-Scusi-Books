import React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";

export default function ImgSelectorUser({ changes, setChanges }) {
  // // // // //
  function uploadImage(e) {
    e.preventDefault(e);
    const formImgData = new FormData();
    formImgData.append("file", e.target.files[0]);
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
        setChanges({ ...changes, image: response.data.secure_url });
      });
  }
  // // // // //
  return (
    <>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={uploadImage} />
        <PhotoCamera />
      </IconButton>
    </>
  );
}
