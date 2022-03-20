import React from "react";
import { Link } from "react-router-dom";
import useVolumesList from "./useVolumesList";

const VolumesList = () => {
  const { volumes, volumesStatus, error, totalItems, loadNextPage } =
    useVolumesList();

  const renderLoading = volumesStatus === "loading" && (
    <div className="loader">loading....</div>
  );

  if (volumesStatus === "idle") {
    return (
      <div className="volumes-list">
        <div className="volumes-list__welcome">
          <h2>Welcome!</h2>
          <p>What are you looking for today, stranger?</p>
        </div>
      </div>
    );
  }
  if (volumesStatus === "failed") {
    return (
      <div className="volumes-list">
        <div className="volumes-list__error">{error}</div>
        {renderLoading}
      </div>
    );
  }
  if (totalItems === 0) {
    return (
      <div className="volumes-list">
        <h2 className="volumes-list__total-items">
          Total volumes: {totalItems}
        </h2>
        <div className="volumes-list__error">
          Try seaching something else :(
        </div>
      </div>
    );
  }
  return (
    <div className="volumes-list">
      <h2 className="volumes-list__total-items">Total volumes: {totalItems}</h2>
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
                    src={require("../../assets/no_image.png")}
                    alt="Not avaliable"
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
      {renderLoading}
    </div>
  );
};

export default VolumesList;
