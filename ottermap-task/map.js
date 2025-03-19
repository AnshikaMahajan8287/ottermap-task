import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ol from "ol";
import "ol/ol.css";

function Map() {
  const history = useHistory();

  // Get the name from localStorage
  const firstName = localStorage.getItem("firstName");

  useEffect(() => {
    // OpenLayers Map Initialization
    const map = new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    // Add Draw Interaction for polygons
    const draw = new ol.interaction.Draw({
      source: new ol.source.Vector(),
      type: "Polygon",
    });
    map.addInteraction(draw);

    // Add Modify Interaction for editing polygons
    const modify = new ol.interaction.Modify({
      source: draw.source_,
    });
    map.addInteraction(modify);

    // Add Delete Interaction (Remove features)
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete Polygon";
    deleteButton.addEventListener("click", () => {
      const features = draw.source_.getFeatures();
      if (features.length > 0) {
        draw.source_.removeFeature(features[features.length - 1]);
      }
    });
    document.body.appendChild(deleteButton);
  }, []);

  return (
    <div>
      <header style={{ textAlign: "center", padding: "10px" }}>
        <h2>Welcome, {firstName}</h2>
      </header>
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
}

export default Map;

