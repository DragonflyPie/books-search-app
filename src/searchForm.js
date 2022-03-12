import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSearchParams } from "./searchSlice";
import { fetchVolumes, resetVolumesState } from "./volumesSlice";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [orderBy, setOrderBy] = useState("relevance");
  const [wrongQuery, setWrongQuery] = useState(false);
  const dispatch = useDispatch();
  const categories = ["Computers", "Art", "Biography"];
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
  return (
    <form onSubmit={submitSearchForm} className="search-form">
      <div className="search-form__input-group">
        <input
          className={inputClass}
          type="text"
          placeholder={wrongQuery ? "" : "Search..."}
          value={query}
          onChange={handleQueryChange}
        />
        <button className="search-form__btn" type="submit">
          <BiSearchAlt />
        </button>
      </div>
      {wrongQuery ? (
        <div className="search-form__error">Missing query</div>
      ) : (
        ""
      )}
      <div className="search-form__bar">
        <div className="search-form__select-group">
          <label htmlFor="category">Category</label>
          <select
            className="search-form__select"
            name=""
            id=""
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            {categoryOptions}
          </select>
        </div>
        <div className="search-form__select-group">
          <label htmlFor="orderBy">Order By</label>
          <select
            className="search-form__select"
            name="orderBy"
            id="orderBy"
            value={orderBy}
            onChange={handleOrderByChange}
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
