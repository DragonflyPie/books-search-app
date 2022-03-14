import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import useSearchForm from "./useSearchForm";

const SearchForm = () => {
  const classNames = require("classnames");

  const {
    submitSearchForm,
    handleCategoryChange,
    handleOrderByChange,
    handleQueryChange,
    categoryOptions,
    orderBy,
    category,
    query,
    wrongQuery,
  } = useSearchForm();

  let inputClass = classNames({
    "search-form__input": true,
    "search-form__input--wrong": wrongQuery,
  });

  return (
    <form
      onSubmit={submitSearchForm}
      className="search-form"
      name="search-form"
    >
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
        <div className="search-form__error" data-testid="error">
          Missing query
        </div>
      ) : (
        ""
      )}
      <div className="search-form__bar">
        <div className="search-form__select-group">
          <label htmlFor="category">Category</label>
          <select
            className="search-form__select"
            name="category"
            data-testid="category"
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
            data-testid="orderBy"
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
