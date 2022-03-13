import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import useSearchForm from "./useSearchForm";

const SearchForm = () => {
  const {
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
  } = useSearchForm();

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
