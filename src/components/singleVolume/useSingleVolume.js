import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVolumeById, selectVolumeById } from "../../redux/volumesSlice";

const useSingleVolume = () => {
  const { volumeId } = useParams();
  const dispatch = useDispatch();

  const volume = useSelector((state) => selectVolumeById(state, volumeId));
  const volumesStatus = useSelector((state) => state.volumes.status);
  const error = useSelector((state) => state.volumes.error);

  useEffect(() => {
    dispatch(fetchVolumeById(volumeId));
  }, [volumeId, dispatch]);

  return { volume, volumesStatus, error };
};

export default useSingleVolume;
