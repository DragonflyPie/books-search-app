import React from "react";
import NoMatch from "./components/noMatch/NoMatch";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./components/layout/Layout";
import VolumesList from "./components/volumesList/VolumesList";
import SingleVolume from "./components/singleVolume/SingleVolume";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<VolumesList />} />
        <Route path="/volumes/:volumeId" element={<SingleVolume />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
