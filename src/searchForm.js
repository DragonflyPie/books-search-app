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
  const dispatch = useDispatch();
  const categories = ["computers", "art", "biography"];
  const navigate = useNavigate();

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

  const submitSearchForm = (e) => {
    e.preventDefault();
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
          className="search-form__input"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
        />
        <button className="search-form__btn" type="submit">
          <BiSearchAlt />
        </button>
      </div>
      <div className="search-form__bar">
        <div className="search-form__select-group">
          <label htmlFor="category">Category</label>
          <select
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
