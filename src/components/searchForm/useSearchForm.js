import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSearchParams } from "../../redux/searchSlice";
import { fetchVolumes } from "../../redux/volumesSlice";

const useSearchForm = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [orderBy, setOrderBy] = useState("relevance");
  const [queryError, setQueryError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CATEGORIES = ["Computers", "Art", "Biography", "History", "Science"];

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
  };

  const submitSearchForm = (e) => {
    e.preventDefault();
    if (!query) {
      setQueryError(true);
      return;
    }
    setQueryError(false);

    let searchParams = {
      query: query,
      category: category,
      orderBy: orderBy,
      page: 1,
    };

    navigate("/");
    dispatch(updateSearchParams(searchParams));
    dispatch(fetchVolumes());
  };
  return {
    submitSearchForm,
    handleCategoryChange,
    handleOrderByChange,
    handleQueryChange,
    orderBy,
    categories: CATEGORIES,
    category,
    query,
    queryError,
  };
};

export default useSearchForm;
