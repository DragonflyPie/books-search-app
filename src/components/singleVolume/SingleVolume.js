import React from "react";
import useSingleVolume from "./useSingleVolume";

const SingleVolume = () => {
  const { volume } = useSingleVolume();

  return (
    <div className="volume">
      {volume.volumeInfo?.imageLinks?.medium ? (
        <img
          className="volume__img"
          src={volume.volumeInfo?.imageLinks?.medium}
          alt={volume.volumeInfo.title}
        ></img>
      ) : volume.volumeInfo?.imageLinks?.thumbnail ? (
        <img
          className="volume__img"
          src={volume.volumeInfo?.imageLinks?.thumbnail}
          alt={volume.volumeInfo.title}
        ></img>
      ) : (
        <img
          className="volume__img"
          src={require("../../assets/no_image.png")}
          alt="Image is not available"
        />
      )}

      <div className="volume__info">
        <div className="volume__title">{volume.volumeInfo.title}</div>
        <div className="volume__categories">
          {volume.volumeInfo?.categories}
        </div>
        <div className="volume__pages">
          {volume.volumeInfo?.pageCount}
          {" pages"}
        </div>
        <div className="volume__authors">
          <span className="volume__date">
            {volume.volumeInfo?.publishedDate?.slice(0, 4)}
            {": "}
          </span>
          {volume.volumeInfo.hasOwnProperty("authors")
            ? volume.volumeInfo.authors.join(", ")
            : "Author is not specified"}
        </div>
        <div className="volume__description">
          {volume.volumeInfo?.description}
        </div>
      </div>
    </div>
  );
};

export default SingleVolume;
