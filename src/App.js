import React from "react";
import NoMatch from "./NoMatch";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import VolumesList from "./VolumesList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<VolumesList />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
