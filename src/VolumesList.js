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
        <h2 className="volumes-list__total-items">
          Total volumes: {totalItems}
        </h2>
        <ul className="volumes-list__grid">
          {volumes.map((volume) => (
            <Link key={volume.id} to={`/volumes/${volume.id}`} className="">
              <li className="card">
                <div className="card__bar">
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
                  <div className="card__title">
                    <p>
                      {volume.volumeInfo.title.length > 62
                        ? `${volume.volumeInfo.title.slice(0, 60)}...`
                        : volume.volumeInfo.title}
                    </p>
                  </div>
                </div>
                <div className="card__info">
                  <div className="card__authors">
                    <span className="card__date">
                      {volume.volumeInfo?.publishedDate?.slice(0, 4)}
                    </span>
                    {": "}
                    {volume.volumeInfo.authors ? (
                      volume.volumeInfo?.authors?.join(", ")
                    ) : (
                      <span className="card__authors--no-author">
                        Author is not specified
                      </span>
                    )}
                  </div>
                  <div className="card__categories">
                    {volume.volumeInfo?.categories}
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
        <button className="volumes-list__button" onClick={loadNextPage}>
          Load more
        </button>
      </>
    );
  }

  return (
    <div className="volumes-list">
      {volumesContent}
      {volumesStatus === "loading" && <div className="loader">loading....</div>}
    </div>
  );
};

export default VolumesList;
