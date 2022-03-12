import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVolumeById, selectVolumeById } from "./volumesSlice";

const SingleVolume = () => {
  const { volumeId } = useParams();
  const dispatch = useDispatch();

  const volume = useSelector((state) => selectVolumeById(state, volumeId));
  useEffect(() => {
    dispatch(fetchVolumeById(volumeId));
  }, [volumeId]);
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
          src={require("./app/images/no_image.png")}
          alt="Image is not available"
        />
      )}

      <div className="volume__info">
        <div className="volume__category">{volume.volumeInfo?.categories}</div>
        <div className="volume__title">{volume.volumeInfo.title}</div>
        <div className="volume__pages">{volume.volumeInfo.pageCount}</div>{" "}
        <div className="volume__date">{volume.volumeInfo.publishedDate}</div>{" "}
        <div className="volume__authors">
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