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
    volumesContent = <div className="volumes-list__error">{error}</div>;
  } else if (volumes.length !== 0) {
    console.log(volumes.length !== 0);
    volumesContent = (
      <>
        <div className="volumes-list__total-items">
          Total volumes: {totalItems}
        </div>
        <ul className="volumes-list__grid">
          {volumes.map((volume) => (
            <li key={volume.id} className="card">
              <Link to={`/volumes/${volume.id}`} className="">
                {volume.volumeInfo?.imageLinks?.thumbnail ? (
                  <img
                    className="card__img"
                    src={volume.volumeInfo.imageLinks.thumbnail}
                    alt={volume.volumeInfo.title}
                  />
                ) : (
                  <img
                    className="card__img"
                    src={require("./app/images/no_image.png")}
                    alt="Image is not avaliable"
                  />
                )}
              </Link>
              <div className="card__info">
                <div className="card__title">
                  <Link to={`/volumes/${volume.id}`}>
                    {volume.volumeInfo.title.length > 62
                      ? `${volume.volumeInfo.title.slice(0, 60)}...`
                      : volume.volumeInfo.title}
                  </Link>
                </div>
                <div className="card__authors">
                  {volume.volumeInfo?.authors?.join(", ")}
                </div>
                <div className="card__categories">
                  {volume.volumeInfo?.categories}
                </div>
                <div className="card__date">
                  {volume.volumeInfo?.publishedDate?.slice(0, 4)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div className="volumes-list">
      {volumesContent}
      {volumesStatus === "loading" && (
        <div className="spinner">loading....</div>
      )}
      <button className="volumes-list__button" onClick={loadNextPage}>
        Load more
      </button>
    </div>
  );
};

export default VolumesList;
