import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVolumes } from "./volumesSlice";

const VolumesList = () => {
  const dispatch = useDispatch();
  const fetch = () => {
    dispatch(fetchVolumes());
  };

  const volumes = useSelector((state) => state.volumes.volumes);
  const volumesStatus = useSelector((state) => state.volumes.status);
  const error = useSelector((state) => state.volumes.error);
  const totalItems = useSelector((state) => state.volumes.totalItems);

  let volumesContent;

  if (volumesStatus === "loading") {
    volumesContent = <div className="">LOADING</div>;
  } else if (volumesStatus === "succeeded" && totalItems !== null) {
    volumesContent = volumes.map((volume) => (
      <div key={volume.id} className="">
        {volume.id}
      </div>
    ));
  } else if (volumesStatus === "failed") {
    volumesContent = <div className="">{error.message}</div>;
  } else {
    volumesContent = <div className="">Nothing was found</div>;
  }

  return <div>{volumesContent}</div>;
};

export default VolumesList;
