import React, { useRef, useState } from "react";
import { MapContainer, ImageOverlay, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent() {
  const imageUrl =
    "https://thumb.bibliocad.com/images/content/00020000/5000/25945.jpg";
  const imageRef = useRef(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const zones = [
    {
      name: "Zona 1",
      coords: [
        [254, 679],
        [254, 877],
        [146, 877],
        [146, 679],
        [254, 679],
      ],
    },
  ];

  const onClickedZone = (zoneName) => {
    alert(`Clicked on zone: ${zoneName}`);
  };

  const handleImageLoad = () => {
    const width = imageRef.current.naturalWidth;
    const height = imageRef.current.naturalHeight;
    setImageWidth(width);
    setImageHeight(height);
  };

  const imageCRS = L.CRS.Simple;

  const maxBounds = [[0, 0], [imageHeight, imageWidth]];

  const finalZones = zones.map((zone) => ({
    name: zone.name,
    coords: zone.coords.map(([y, x]) => [imageHeight - y, x]),
  }));

  return (
    <>
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Map"
        style={{ display: "none" }}
        onLoad={handleImageLoad}
      />
      {imageWidth > 0 && imageHeight > 0 && (
        <MapContainer
          crs={imageCRS}
          center={[imageHeight / 2, imageWidth / 2]}
          zoom={0}
          minZoom={0}
          maxZoom={1}
          maxBounds={maxBounds}
          style={{ height: "100%", width: "100%", backgroundColor: "black" }}
          attributionControl={false}
        >
          <ImageOverlay url={imageUrl} bounds={maxBounds} />
          {finalZones.map(({ name, coords }, index) => {
            return (
              <Polygon
                key={index}
                positions={coords}
                pathOptions={{ color: "white", fillColor: "white", fillOpacity: 0.5, weight: 0 }}
                interactive={true}
                eventHandlers={{ click: () => onClickedZone(name) }}
              />
            );
          })}
        </MapContainer>
      )}
    </>
  );
}

export default MapComponent;
