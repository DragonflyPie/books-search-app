import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchVolumeById, selectVolumeById } from "./volumesSlice";

const SingleVolume = () => {
  const navigate = useNavigate();
  const { volumeId } = useParams();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate(-1);
  };
  const volume = useSelector((state) => selectVolumeById(state, volumeId));
  useEffect(() => {
    dispatch(fetchVolumeById(volumeId));
  }, [volumeId]);
  return (
    <div className="">
      {volume.volumeInfo?.imageLinks?.medium ? (
        <img
          className=""
          src={volume.volumeInfo?.imageLinks?.medium}
          alt={volume.volumeInfo.title}
        ></img>
      ) : volume.volumeInfo?.imageLinks?.thumbnail ? (
        <img
          className=""
          src={volume.volumeInfo?.imageLinks?.thumbnail}
          alt={volume.volumeInfo.title}
        ></img>
      ) : (
        <img
          className=""
          src={require("./app/images/no_image.png")}
          alt="Image is not available"
        />
      )}

      <div className="">
        <div className="">{volume.volumeInfo?.categories}</div>
        <div className="">{volume.volumeInfo.title}</div>
        <div className="">{volume.volumeInfo.pageCount}</div>{" "}
        <div className="">{volume.volumeInfo.publishedDate}</div>{" "}
        <div className="volume-authors">
          Авторы:{" "}
          {volume.volumeInfo.hasOwnProperty("authors")
            ? volume.volumeInfo.authors.join(", ")
            : "-"}
        </div>
        <div className="">{volume.volumeInfo?.description}</div>
      </div>
    </div>
  );
};

export default SingleVolume;
