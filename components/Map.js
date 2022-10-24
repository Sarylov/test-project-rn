import * as React from "react";
import { WebView } from "react-native-webview";
import { View, Text } from "react-native";

export default function MapComponent(props) {
  const { usersPos, userId } = props;
  const usersKeys = Object.keys(usersPos);

  const initialHTMLContent = () => {
    const markers = ` ${usersKeys.map((key) => {
      return `{
        geometry: {
          type: "Point",
          coordinates: [${usersPos[key].longitude}, ${usersPos[key].latitude}],
        },
      }`;
    })}`;

    let res = `
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Display a map on a webpage</title>
    <meta
      name="viewport"
      content="initial-scale=1,maximum-scale=1,user-scalable=no"
    />
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css"
      rel="stylesheet"
    />
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.js"></script>
    <style>
      body {
        margin: 0;
        padding: 0;
      }
      #map {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
      }
      .marker {
        background-image: url("https://img.icons8.com/color/344/map-pin.png");
        background-size: cover;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      const geojson = {
        features:  [${markers}]
      };
      mapboxgl.accessToken =
        "pk.eyJ1IjoiamFsc2FuIiwiYSI6ImNsOWs4MDJ0ZDBkazUzdXBsOGt5NTNpY3AifQ.VCfcKZFqfAsT603Y1Selaw";
      const map = new mapboxgl.Map({
        container: "map", // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [44.2558, 46.3078], // starting position [lng, lat]
        zoom: 12, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });

      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });

      // add markers to map
      for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement("div");
        el.className = "marker";
        console.log(el);

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);
      }
    </script>
  </body>
</html>
`;

    return res;
  };

  return (
    <View
      style={{
        flex: 1,
        // width: "100%",
      }}
    >
      <WebView
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{
          html: initialHTMLContent(),
          // baseUrl: "https://hotels.yourroom.eu",
        }}
      />
    </View>
  );
}
