import React from "react";
import noImgAvailable from "../../../sourceImg/no_image_available.png";
import TextareaAutosize from "@mui/material/TextareaAutosize";
export default function NewBookPreview({ newBook, edit }) {
  return (
    <div>
      <div className="">
        <div className="previewContainer">
          {newBook.image ? (
            <img className="imgPreview" src={newBook.image} />
          ) : (
            <img className="imgPreviewDefault" src={noImgAvailable} />
          )}

          <span className="previewTitles">
            Title:{" "}
            <span className="contentTitles">
              {newBook.title ? `${newBook.title}` : "<empty>"}
            </span>
          </span>

          <span className="previewTitles">
            Author:{" "}
            <span className="contentTitles">
              {newBook.author.length
                ? `${newBook.author.join(", ")}`
                : "<empty>"}
            </span>
          </span>
          <span className="previewTitles">
            Editorial:{" "}
            <span className="contentTitles">
              {newBook.editorial ? `${newBook.editorial}` : "<empty>"}
            </span>
          </span>
          <span className="previewTitles">
            Edition:{" "}
            <span className="contentTitles">
              {newBook.edition ? `${newBook.edition}` : "<empty>"}
            </span>
          </span>
          <span className="previewTitles">
            Price:{" "}
            <span className="contentTitles">
              {newBook.price ? `U$D ${newBook.price}` : "<empty>"}
            </span>
          </span>
          <span className="previewTitles">
            Theme:{" "}
            <span className="contentTitles">
              {newBook.categories[0] ? `${newBook.categories[0]}` : "<empty>"}
            </span>
          </span>
          <span className="previewTitles">
            Categoy:{" "}
            <span className="contentTitles">
              {newBook.categories[1] ? `${newBook.categories[1]}` : "<empty>"}{" "}
            </span>
          </span>
          <span className="previewTitles">
            Subcategory:{" "}
            <span className="contentTitles">
              {newBook.categories[2] ? `${newBook.categories[2]}` : "<empty>"}
            </span>
          </span>

          <span className="previewTitlesSynopsis">Synopsis:</span>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            className="textareaAutosizex"
            name="synopsis"
            value={newBook.synopsis ? `${newBook.synopsis}` : "<empty>"}
          />

          <span className="previewTitles">
            Format:{" "}
            <span className="contentTitles">
              {newBook.format ? `${newBook.format}` : "<empty>"}
            </span>
          </span>
          <span className="previewTitles">
            Language:{" "}
            <span className="contentTitles">
              {newBook.language ? `${newBook.language}` : "<empty>"}
            </span>
          </span>
          <span className="previewTitles">
            ISBN:{" "}
            <span className="contentTitles">
              {newBook.ISBN ? `${newBook.ISBN}` : "<empty>"}
            </span>
          </span>

          {
            !edit ? 
              <span className="previewTitles">
                Stock:{" "}
                <span className="contentTitles">
                  {newBook.stock
                    ? `${newBook.stock} ${newBook.stock > 1 ? "units" : "unit"}`
                    : "<empty>"}
                </span>
              </span>
            : null  
          }      
        </div>
      </div>
    </div>
  );
}
