import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchVolumes, resetVolumesState } from "../../redux/volumesSlice";
import { updateSearchParams } from "../../redux/searchSlice";

const useSearchForm = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [orderBy, setOrderBy] = useState("relevance");
  const [wrongQuery, setWrongQuery] = useState(false);
  const dispatch = useDispatch();
  const categories = ["Computers", "Art", "Biography", "History", "Science"];
  const navigate = useNavigate();
  const classNames = require("classnames");

  const categoryOptions = categories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ));

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
  };

  let inputClass = classNames({
    "search-form__input": true,
    "search-form__input--wrong": wrongQuery,
  });

  const submitSearchForm = (e) => {
    e.preventDefault();
    if (!query) {
      setWrongQuery(true);
      return;
    }
    setWrongQuery(false);
    navigate("/");
    dispatch(resetVolumesState());
    dispatch(
      updateSearchParams({
        query: query,
        category: category,
        orderBy: orderBy,
        page: 1,
      })
    );
    dispatch(fetchVolumes());
  };
  return {
    inputClass,
    submitSearchForm,
    handleCategoryChange,
    handleOrderByChange,
    handleQueryChange,
    categoryOptions,
    orderBy,
    category,
    query,
    wrongQuery,
  };
};

export default useSearchForm;
