import React from "react";

const VolumesList = () => {
  const volumes = [
    { id: 1, name: "omg" },
    { id: 2, name: "kek" },
  ];
  const renderedVolumes = volumes.map((volume) => (
    <li key={volume.id}>{volume.name}</li>
  ));
  return <ul>{renderedVolumes}</ul>;
};

export default VolumesList;
