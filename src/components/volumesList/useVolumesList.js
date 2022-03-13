import { useDispatch, useSelector } from "react-redux";
import { updatePage } from "../../redux/searchSlice";
import { fetchVolumes, selectAllVolumes } from "../../redux/volumesSlice";

const useVolumesList = () => {
  const dispatch = useDispatch();

  const volumes = useSelector((state) => selectAllVolumes(state));
  const volumesStatus = useSelector((state) => state.volumes.status);
  const error = useSelector((state) => state.volumes.error);
  const totalItems = useSelector((state) => state.volumes.totalItems);

  const loadNextPage = () => {
    dispatch(updatePage());
    dispatch(fetchVolumes());
  };
  return { volumes, volumesStatus, error, totalItems, loadNextPage };
};

export default useVolumesList;
