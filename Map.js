import React from "react";
import { MapContainer, ImageOverlay, Rectangle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent() {
  const imageUrl =
    "https://marvel-b1-cdn.bc0a.com/f00000000266467/www.grandhomes.com/CmImageDir/model_floorplan_1686.jpg";
  const imageBounds = [
    [0, 0],
    [1000, 1000],
  ];

  const imageBounds2 = [
    [100, 100],
    [200, 200],
  ];

  const handleRectangleClick = () => {
    alert("Rectangle clicked!");
  };

  return (
    <MapContainer
      center={[500, 500]}
      zoom={1}
      crs={L.CRS.Simple}
      style={{ height: "100%", width: "100%", backgroundColor: "black"}}
      attributionControl={false}
    >
      <ImageOverlay url={imageUrl} bounds={imageBounds} />
      
      <ImageOverlay url={imageUrl} bounds={imageBounds2} />
      <Rectangle
        bounds={imageBounds2}
        color="red"
        eventHandlers={{ click: handleRectangleClick }}
      />
    </MapContainer>
  );
}

export default MapComponent;