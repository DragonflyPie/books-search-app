import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVolumeById, selectVolumeById } from "../../redux/volumesSlice";

const useSingleVolume = () => {
  const { volumeId } = useParams();
  const dispatch = useDispatch();

  const volume = useSelector((state) => selectVolumeById(state, volumeId));
  useEffect(() => {
    dispatch(fetchVolumeById(volumeId));
  }, [volumeId, dispatch]);

  return { volume };
};

export default useSingleVolume;
