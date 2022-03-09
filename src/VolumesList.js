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
          <li key={volume.id} className="">
            <Link to={`/volumes/${volume.id}`}>{volume.id}</Link>
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
