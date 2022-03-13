import React from "react";
import { Outlet } from "react-router-dom";
import SearchForm from "../searchForm/SearchForm";

const Layout = () => {
  return (
    <>
      <div className="navbar">
        <h1>Search for books</h1>
        <SearchForm />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
