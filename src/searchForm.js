import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { updateSearchParams } from "./searchSlice";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [orderBy, setOrderBy] = useState("relevance");
  const dispatch = useDispatch();
  const categories = ["computers", "art", "biography"];

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
    dispatch(
      updateSearchParams({ query: query, category: category, orderBy: orderBy })
    );
  };
  return (
    <form onSubmit={submitSearchForm}>
      <div className="search-group">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
        />
        <button className="search" type="submit">
          <BiSearchAlt />
        </button>
      </div>
      <div className="">
        <label htmlFor="category">Category</label>
        <select name="" id="" value={category} onChange={handleCategoryChange}>
          <option value="all">All</option>
          {categoryOptions}
        </select>
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
    </form>
  );
};

export default SearchForm;
