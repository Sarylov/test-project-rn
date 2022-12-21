import * as React from "react";
import { WebView } from "react-native-webview";
import { View, Text } from "react-native";

export default function MapComponent(props) {
  const { usersPos, userId } = props;
  const usersKeys = Object.keys(usersPos);

  const initialHTMLContent = () => {
    const markers = ` [${usersKeys.map((key) => {
      return `{
        pos:[${usersPos[key].latitude}, ${usersPos[key].longitude}], 
        title:"${usersPos[key].username}",
        icon: ${key == userId ? "myIcon " : "friendIcon"}
      }`;
    })}]`;

    let res = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Добавление метки с собственным изображением</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!--
            Укажите свой API-ключ. Тестовый ключ НЕ БУДЕТ работать на других сайтах.
            Получить ключ можно в Кабинете разработчика: https://developer.tech.yandex.ru/keys/
        -->
        <script
          src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp"
          type="text/javascript"
        ></script>
        <script type="text/javascript">
          ymaps.ready(function () {
            const myIcon = {
              iconLayout: "default#imageWithContent",
              iconImageHref:
                "https://cdn-icons-png.flaticon.com/512/2838/2838709.png",
              iconImageSize: [48, 48],
              iconImageOffset: [-24, -48],
              iconContentLayout: MyIconContentLayout,
            };
            const friendIcon = {
              iconLayout: "default#imageWithContent",
              iconImageHref:
                "https://cdn-icons-png.flaticon.com/512/2377/2377922.png",
              iconImageSize: [50, 50],
              iconImageOffset: [-25, -50],
              iconContentLayout: MyIconContentLayout,
            };
    
            const placemarks = ${markers}
    
            var myMap = new ymaps.Map("map", {
                center: [46.3078, 44.2558],
                zoom: 13,
              }),
              // Создаём макет содержимого.
              MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: ; font-weight: bold;">$[properties.iconContent]</div>'
              );
            placemarks.forEach((placemarkInfo) => {
              const placemark = new ymaps.Placemark(
                placemarkInfo.pos,
                { balloonContent: placemarkInfo.title },
                placemarkInfo.icon
              );
    
              myMap.geoObjects.add(placemark);
            });
          });
        </script>
        <style>
          html,
          body,
          #map {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
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
