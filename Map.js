import React, {useEffect, useState} from "react";
import {Circle, FeatureGroup, ImageOverlay, MapContainer, Polygon} from "react-leaflet";
import {EditControl} from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import {Image} from "react-native";
import {FaDrawPolygon, FaRegCircle, FaRegSquare} from "react-icons/fa";
import { Button } from "react-native";


const DrawControls = ({ onCreated }) => {
  const drawingOptions = {
    polyline: {
      shapeOptions: {
        color: "blue",
        fillOpacity: 0.2,
      },
      icon: <FaDrawPolygon />,
    },
    rectangle: {
      shapeOptions: {
        color: "green",
        fillOpacity: 0.2,
      },
      icon: <FaRegSquare />,
    },
    circle: {
      shapeOptions: {
        color: "red",
        fillOpacity: 0.2,
      },
      icon: <FaRegCircle />,
    },
  };

  return (
    <EditControl
      position="topright"
      onCreated={onCreated}
      draw={
        {
          circlemarker: false,
          marker: false,
          polyline: false,
          circle: false,
          polygon: false,

        }}
    />
  );
};

function MapComponent({ cHeight, cWidth }) {
  const [dimensions, setDimensions] = useState({});
  const [factor, setFactor] = useState(1);

  const [zonesData, setZonesData] = useState([]);


  const imageUrl = "https://thumb.bibliocad.com/images/content/00020000/5000/25945.jpg";

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

  const zones = [
    // [
    //   [dimensions.height - 254, 679],
    //   [dimensions.height - 146, 679],
    //   [dimensions.height - 146, 877],
    //   [dimensions.height - 254, 877],
    // ],
  ];

  const circles = [
    // {
    //   center: [dimensions.height - 372, 659],
    //   radius: 20,
    // },
  ];

  const onClickedZone = () => {
    alert("Rectangle clicked!");
  };

  const _created = async (e) => {
    const { layerType, layer } = e;
    const zoneName = window.prompt("Please enter the name of the zone");
    if (zoneName === null || zoneName === "") {
      console.log("User cancelled the prompt");
    } else {
      const coords = layer.getLatLngs()[0].map(({ lat, lng }) => [lat, lng]);
      console.log(`Created ${layerType} named ${zoneName} with coordinates: ${coords}`);
      setZonesData((prevZones) => ({
        ...prevZones,
        [zoneName]: coords,
      }));
    }
  };

  const uploadZonesData = async () => {
    const response = await fetch('https://webhook.site/8933f598-5aae-425c-9711-f4849cf33b6d', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zonesData),
      mode: 'no-cors',
    });
    
    alert('Data uploaded')
  
    // if (response.ok) {
    //   alert('Data uploaded successfully');
    // } else {
    //   console.error('Failed to upload data');
    // }
  };

  zones.forEach((zone) => multiplyPositions(zone, factor));
  circles.forEach((circle) => multiplyCenters(circle, factor));

  return (
    dimensions.height != null && (
      <>
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
        <FeatureGroup>
          <DrawControls onCreated={_created} />
          <FeatureGroup
            onLayerClick={(e) => {
              alert(`Clicked on ${e.layerType}`);
            }}
          />
        </FeatureGroup>
        {zones?.map((zone, index) => (
          <Polygon
            key={index}
            positions={zone}
            stroke={false}
            pathOptions={{
              fillOpacity: 0.2,
            }}
            eventHandlers={{ click: onClickedZone }}
          />
        ))}
        {circles?.map((circle, index) => (
          <Circle
            key={index}
            center={circle.center}
            radius={circle.radius}
            stroke={false}
            pathOptions={{
              fillOpacity: 0.2,
            }}
            eventHandlers={{ click: onClickedZone }}
          />
        ))}
      </MapContainer>
              <Button title="Upload zones data" onPress={uploadZonesData} />
              {/* <pre style={{ maxHeight: '200px', overflow: 'auto' }}>{JSON.stringify(zonesData, null, 2)}</pre> */}

              </>

    )
  );
}

function multiplyPositions(zone, factor) {
  return zone.map((position) => position.map((coordinate) => coordinate * factor));
}

function multiplyCenters(circle, factor) {
  return {
    radius: circle.radius * factor,
    center: circle.center.map((coordinate) => coordinate * factor),
  };
}

export default MapComponent;
