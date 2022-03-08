import React from "react";
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
    volumesContent = volumes.map((volume) => (
      <div key={volume.id} className="">
        {volume.id}
      </div>
    ));
  } else if (volumesStatus === "succeeded") {
    volumesContent = <div className="">Nothing was found</div>;
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
