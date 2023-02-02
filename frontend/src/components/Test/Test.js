import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import './Test.css';

let map;

let maybe = {
  lat: 27.173891,
  lng: 78.042068
}

const google_maps_api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// console.log(google_maps_api_key)

function initMapLocal() {
  // The location of Uluru
  console.log('INIT MAP!!')
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru

  if (window.google && window.google.maps) {
    console.log('FOUND GOOGLE OBJECT')
    const mapContainer = document.getElementById("map");


    const map = new window.google.maps.Map(mapContainer, {
      zoom: 4,
      center: uluru,
    });
    console.log('MAP OBJECT: ', map)
    // The marker, positioned at Uluru
    const marker = new window.google.maps.Marker({
      position: uluru,
      map: map,
    });
  } else {
    setTimeout(() => {
      initMap();
    }, 500);
  }
}

export default function Test() {


useEffect(() => {
  // const mapContainer = document.getElementById('map');

  // map = new window.google.maps.Map(mapContainer,{});
  initMapLocal();
  // window.initMap();

  const input = document.getElementById('pac-input');
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["establishment", "country", "city"]
  };
  const autocomplete = new window.google.maps.places.Autocomplete(input, options);
  // autocomplete.bindTo("bounds", map);

  // const infowindow = new google.maps.InfoWindow();
  // const infowindowContent = document.getElementById("infowindow-content");

  // infowindow.setContent(infowindowContent);

  // const marker = new google.maps.Marker({
  //   map,
  //   anchorPoint: new google.maps.Point(0, -29),
  // });

  // console.log('AUTO: ', autocomplete);

}, []);


  return (
    <>
      <div id="map"></div>
      <input id="pac-input"></input>
      <Helmet>
        <script async defer
          src={`https://maps.googleapis.com/maps/api/js?key=${google_maps_api_key}&callback=initMap&v=weekly&libraries=places`}>
        </script>
      </Helmet>
      {/* <script type="module" src="./window.js"></script> */}
    </>
  )
}
