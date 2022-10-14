import React from 'react';
import axios from 'axios';

export default function ImgSelector(props) {
  // // // // //
  let fileElem = document.getElementById('inputImgSel');
  function handleImgSel(e) {
    e.preventDefault();
    if (fileElem) fileElem.click();
  }
  // // // // //
  function uploadImage() {
    const formImgData = new FormData();
    formImgData.append('file', props.imgSelected.file);
    formImgData.append('upload_preset', 'u3dgsoub');
    axios
      .post(
        'https://api.cloudinary.com/v1_1/scusi-books/image/upload',
        formImgData
      )
      .then((response) => {
        props.setImgSelected({
          ...props.imgSelected,
          url: response.data.secure_url,
        });
        props.setNewBook({ ...props.newBook, image: response.data.secure_url });
      });
  }
  // // // // //
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        id="inputImgSel"
        style={{ display: 'none' }}
        onChange={(e) => {
          props.setImgSelected({
            ...props.imgSelected,
            file: e.target.files[0],
          });
        }}
      />
      <a href="#" onClick={handleImgSel}>
        Select image
      </a>
      <button onClick={uploadImage}>upload</button>
    </div>
  );
}
