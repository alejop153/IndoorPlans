import React, { useEffect, useState } from "react";
import { MapContainer, ImageOverlay, Polygon, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Image } from "react-native";

// [arriba, x de izq a der]

function MapComponent({ cHeight, cWidth }) {
  const [dimensions, setDimensions] = useState({});
  const [factor, setFactor] = useState(1);
  const imageUrl =
    "https://thumb.bibliocad.com/images/content/00020000/5000/25945.jpg";

  useEffect(() => {
    Image.getSize(
      imageUrl,
      (width, height) => {
        setDimensions({ width, height });
        setFactor(cHeight < cWidth ? cHeight / height : cWidth / width);
      },
      (error) => {
        console.error("Failed to load image", error);
      }
    );
  }, []);

  const imageBounds = [
    [0, 0],
    [dimensions.height * factor, dimensions.width * factor],
  ];

  const handleZoneClick = (zone) => {
    if (zone.isReserved) {
      alert("This zone is not available.");
    } else {
      const confirmReservation = window.confirm(
        "Do you want to reserve this zone?"
      );
      if (confirmReservation) {
        console.log(`API request to reserve zone ${zone.id}`);
        // Here you would make your API request to reserve the zone.
      }
    }
  };

  // ------------------------------------------

  var zones = [
    {
      id: 1,
      name: "Zone 1",
      coords: [
        [dimensions.height - 254, 679],
        [dimensions.height - 146, 679],
        [dimensions.height - 146, 877],
        [dimensions.height - 254, 877],
      ],
      type: "rectangle",
      isReserved : false

    },
    // Add more zones here...
  ];



  const onClickedZone = () => {
    alert("Rectangle clicked!");
  };

  // ------------------------------------------

  zones = multiplyPositions(zones, factor);

  return (
    dimensions.height != null && (
      <MapContainer
        crs={L.CRS.Simple}
        center={[imageBounds[1][0] / 2, imageBounds[1][1] / 2]}
        zoom={0}
        maxZoom={2 - factor}
        maxBounds={[
          imageBounds[1].map((x) => 0 - x * 0.1),
          imageBounds[1].map((x) => x * 1.1),
        ]}
        style={{ height: "100%", width: "100%", backgroundColor: "black" }}
        attributionControl={false}
      >
        <ImageOverlay url={imageUrl} bounds={imageBounds} />
        {zones.map((zone, index) => {
          return (
            <Polygon
              key={zone.id}
              positions={zone.coords}
              stroke={false}
              pathOptions={{
                fillOpacity: 0.2,
              }}
              eventHandlers={{ click: () => handleZoneClick(zone) }}
            />
          );
        })}

      </MapContainer>
    )
  );
}

function multiplyPositions(zones, factor) {
  return zones.map((zone) => ({
    ...zone,
    coords: zone.coords.map((position) =>
      position.map((coordinate) => coordinate * factor)
    ),
  }));
}

function multiplyCenters(circles, factor) {
  return circles.map((circle) => ({
    radius: circle.radius * factor,
    center: circle.center.map((coordinate) => coordinate * factor),
  }));
}

export default MapComponent;
