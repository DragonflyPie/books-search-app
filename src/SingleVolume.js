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
    <div>
      {volume.volumeInfo.title}
      <button onClick={goBack}>Backs</button>
    </div>
  );
};

export default SingleVolume;
