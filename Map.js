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

  const zones = [
    [
      [finalYCoord - 254, 679],
      [finalYCoord - 146, 877],
    ],
  ];

  const onClickedZone = () => {
    alert("Rectangle clicked!");
  };

  return (
    <MapContainer
      crs={L.CRS.Simple}
      center={[finalYCoord / 2, finalXCoord / 2]}
      zoom={0}
      maxZoom={1}
      style={{ height: "100%", width: "100%", backgroundColor: "black" }}
      attributionControl={false}
    >
      <ImageOverlay url={imageUrl} bounds={imageBounds} />
      {zones.map((zone, index) => {
        return (
          <ImageOverlay
            key={index}
            url={
              "https://www.clker.com/cliparts/9/9/c/8/q/7/grey-rounded-rectangle-gery-rounded-rectangle.svg.hi.png"
            }
            opacity={0.5}
            bounds={zone}
            interactive={true}
            eventHandlers={{ click: onClickedZone }}
          />
        );
      })}
    </MapContainer>
  );
}

export default MapComponent;
