import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePage } from "./searchSlice";
import {
  fetchVolumes,
  resetVolumesState,
  selectAllVolumes,
  selectVolumeById,
  selectVolumesIds,
} from "./volumesSlice";

const VolumesList = () => {
  const dispatch = useDispatch();

  const volumes = useSelector((state) => selectAllVolumes(state));
  const volumesStatus = useSelector((state) => state.volumes.status);
  const error = useSelector((state) => state.volumes.error);
  const totalItems = useSelector((state) => state.volumes.totalItems);

  const loadNextPage = () => {
    dispatch(updatePage());
    dispatch(fetchVolumes());
  };

  let volumesContent;

  if (volumesStatus === "failed") {
    volumesContent = <div className="">{error}</div>;
  } else if (volumes) {
    volumesContent = (
      <div className="">
        <div className="">{totalItems}</div>
        <ul className=""></ul>
        {volumes.map((volume) => (
          <li key={volume.id} className="volume-card">
            <Link to={`/volumes/${volume.id}`} className="">
              {volume.volumeInfo?.imageLinks?.thumbnail ? (
                <img
                  className=""
                  src={volume.volumeInfo.imageLinks.thumbnail}
                  alt={volume.volumeInfo.title}
                />
              ) : (
                <img
                  className=""
                  src={require("./app/images/no_image.png")}
                  alt="Image is not avaliable"
                />
              )}
            </Link>
            <div className="">
              <div className="">
                <Link to={`/volumes/${volume.id}`}>
                  {volume.volumeInfo.title.length > 62
                    ? `${volume.volumeInfo.title.slice(0, 60)}...`
                    : volume.volumeInfo.title}
                </Link>
              </div>
              <div className="">{volume.volumeInfo?.authors?.join(", ")}</div>
              <div className="">{volume.volumeInfo.categories}</div>
              <div className="">
                {volume.volumeInfo.publishedDate.slice(0, 4)}
              </div>
            </div>
          </li>
        ))}
      </div>
    );
  } else {
    volumesContent = <div className="">Something went wrong</div>;
  }

  return (
    <div>
      {volumesContent}
      {volumesStatus === "loading" && <div className="">loading....</div>}
      <button className="" onClick={loadNextPage}>
        load more
      </button>
    </div>
  );
};

export default VolumesList;
