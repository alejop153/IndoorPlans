import React from "react";
import { MapContainer, ImageOverlay, Rectangle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// [arriba, derecha]

function MapComponent() {
  const imageUrl =
    "https://thumb.bibliocad.com/images/content/00020000/5000/25945.jpg";
  const finalXCoord = 1000;
  const finalYCoord = 750;
  const imageBounds = [
    [0, 0],
    [finalYCoord, finalXCoord],
  ];

  const imageBounds2 = [
    [finalYCoord - 254, 679],
    [finalYCoord - 146, 877],
  ];

  const handleRectangleClick = () => {
    alert("Rectangle clicked!");
  };

  return (
    <MapContainer
      crs={L.CRS.Simple}
      center={[finalYCoord / 2, finalXCoord / 2]}
      zoom={0}
      style={{ height: "100%", width: "100%", backgroundColor: "black" }}
      attributionControl={false}
    >
      <ImageOverlay url={imageUrl} bounds={imageBounds} />

      {/* <ImageOverlay
        url={
          "https://as2.ftcdn.net/v2/jpg/05/64/68/71/1000_F_564687131_3oKATULZmb0EbdWu4CSZgtdJZSfVHOjE.jpg"
        }
        bounds={imageBounds2}
      /> */}
      <Rectangle
        fillColor="red"
        stroke={false}
        bounds={imageBounds2}
        eventHandlers={{ click: handleRectangleClick }}
      />
    </MapContainer>
  );
}

export default MapComponent;
