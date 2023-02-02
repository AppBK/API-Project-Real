import React, { useEffect, useState, useContext } from 'react'
import { RouterContext } from '../../context/RouterContext';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow, Autocomplete } from '@react-google-maps/api';
import './Map.css'

const google_maps_api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '610px'
};

// Las Vegas: 36.114647, -115.172813
// Taj Mahal: 27.173891, 78.042068
// Tokyo: 35.652832, 139.839478

// Foreign formatted_address length:
// Domestic formatted_address length: 4
const libraries = ["places"];

const placesOptions = {
  fields: ["formatted_address", "geometry", "name", "lat", "lng"],
  strictBounds: false
  // types: ["establishment"],
};

let autocomplete;

function MyComponent() {
  const [lat, setLat] = useState(27.173891);
  const [lng, setLng] = useState(78.042068);
  const [activeMarker, setActiveMarker] = useState(null);
  const [searchResult, setSearchResult] = useState('');

  const { userCity, setUserCity, locationServicesEnabled, setLocationServicesEnabled } = useContext(RouterContext);


  function getCityName() {
    const request = new XMLHttpRequest();

    const method = 'GET';
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true' + '&key=' + google_maps_api_key;
    const async = true;

    request.open(method, url, async);
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        const data = JSON.parse(request.responseText);
        const address = data.results[0];
        const addressArray = address.formatted_address.split(',');

        if (addressArray.length === 4) {
          setUserCity(addressArray[1]);
        } else {
          setUserCity(addressArray[4]);
        }
        // console.log('ARRAY: ', address);
      }
    };
    request.send();
  }


  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const onSuccess = (position) => {
    console.log('LAT: ', position.coords.latitude)
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);

    getCityName();
  }

  const onError = () => {
    setLocationServicesEnabled(false);
    getCityName();
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }


  // 37.24656605075018, -121.852181414779
  // const center = {
  //   lat: lat ? lat : 37.24656605075018,
  //   lng: lng ? lng : -121.852181414779
  // };

  const center = {
    lat: lat,
    lng: lng
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: google_maps_api_key,
    libraries: libraries
  })

  useEffect(() => {
    getLocation();


    // setTimeout(() => {
    //   const search = document.getElementById('autocomplete');
    //   autocomplete = new window.google.maps.places.Autocomplete(search, placesOptions);
    //   const mapper = document.getElementsByClassName('gm-style')[0];
    //   console.log('MAPPER: ', mapper);

    //   const marker = new google.maps.Marker({
    //     map,
    //     anchorPoint: new google.maps.Point(0, -29),
    //   });

    //   autocomplete.addListener("place_changed", () => {
    //     marker.setVisible(false);

    //     const place = autocomplete.getPlace();

    //     if (!place.geometry || !place.geometry.location) {
    //       // User entered the name of a Place that was not suggested and
    //       // pressed the Enter key, or the Place Details request failed.
    //       window.alert("No details available for input: '" + place.name + "'");
    //       return;
    //     }

    //     // If the place has a geometry, then present it on a map.
    //     if (place.geometry.viewport) {
    //       map.fitBounds(place.geometry.viewport);
    //     } else {
    //       map.setCenter(place.geometry.location);
    //       map.setZoom(17);
    //     }

    //     marker.setPosition(place.geometry.location);
    //     marker.setVisible(true);
    //   });
    // }, 1000);
  }, []);

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    map.setZoom(12);

    setMap(map);
    // autocomplete.bindTo("bounds", renderMap);
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const markers = [
    {
      id: 1,
      position: center
    }
  ];


  // {!locationServicesEnabled ? noLocationServices : null}
  let noLocationServices = <InfoWindow position={center}><div id="info-content">It appears that you have Location Services disabled.</div></InfoWindow>
  let centralMarkerId = 1;
  // let searchBar = <input id="autocomplete" type="text"></input>;
  let centralMarker = <MarkerF id="default-marker" key={centralMarkerId} position={center} onClick={() => handleActiveMarker(centralMarkerId)}>{!locationServicesEnabled ? noLocationServices : null}</MarkerF>
  let renderMap = <GoogleMap id="my-map" mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={onLoad} onUnmount={onUnmount} onClick={() => setActiveMarker(null)}>{centralMarker}</GoogleMap>



  let request;
  let autocomplete;
  if (window.google) {
    console.log('MAKING SEARCH BAR?');

    request = {
      query: 'Taj Mahal',
      fields: ['name', 'geometry'],
    };

    // searchBar = new window.google.maps.places.PlacesService(renderMap.instance);

    console.log('GOOGLE OBJ: ', window.google);


    // searchBar.findPlaceFromQuery(request, function (results, status) {
    //   if (status === window.google.maps.places.PlacesServiceStatus.OK) {
    //     console.log('INSIDE!!!')
    //     for (let i = 0; i < results.length; i++) {
    //       createMarker(results[i]);
    //     }
    //     renderMap.setCenter(results[0].geometry.location);
    //   }
    // });
  }

  function onLoadAutoComplete(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    console.log('Something changed', autocomplete);

    const auto = document.getElementsByClassName('pac-target-input')[0];
    // console.log('AUTO: ', this.getPlace());
    // console.log('CURRENT RESULT: ', searchResult);
    // const autoComp = document.getElementById('autoCP');
    // console.log('AUTO: ', autoComp);
    // if (searchResult !== null) {
    //   setSearchResult(searchResult);
    //   //variable to store the result
    //   const place = searchResult.getPlace();
    //   console.log('PLACE OBJECT: ', place);
      //variable to store the name from place details result

      // let location;
      // const geocoder = new window.google.maps.Geocoder();
      // geocoder.geocode(({ placeId: place.place_id }))
      //   .then(({ results }) => {
      //     console.log('RESULTS: ', results);
      //     if (results[0]) {
      //       location = results[0];
      //       console.log('LOCATION: ', location);
      //     } else {
      //       window.alert("No results found");
      //     }
      //   });

      // console.log('LOCATION: ', location)

    //   const name = place.name;
    //   //variable to store the status from place details result
    //   const status = place.business_status;
    //   //variable to store the formatted address from place details result
    //   const formattedAddress = place.formatted_address;
    //   // console.log(place);
    //   //console log all results
    //   console.log(`Name: ${name}`);
    //   console.log(`Business Status: ${status}`);
    //   console.log(`Formatted Address: ${formattedAddress}`);
    // } else {
    //   alert("Please enter text");
    // }
  }

  console.log('CURRENT RESULT INITIAL: ', searchResult);


  return isLoaded ? (
    <>
    <Autocomplete onPlaceChanged={(e) => onPlaceChanged(e)} onLoad={onLoadAutoComplete}>
      <input id="autoCP" type="text"></input>
    </Autocomplete>
    {renderMap}
   {/* <GoogleMap
      mapContainerStyle={containerStyle}
       center={center}
       zoom={12}
       onLoad={onLoad}
       onUnmount={onUnmount}
       onClick={() => setActiveMarker(null)}
     > */}
      { /* Child components, such as markers, info windows, etc. */}
      {/* {centralMarker} */}
      {/* {markers.map(({ id, position }) => (
        <MarkerF
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
        </MarkerF>
      ))} */}
      {/* <></> */}
    {/* </GoogleMap> */}
    </>
  ) : <></>
}

export default React.memo(MyComponent)

  '<input type = "text" class="pac-target-input" placeholder = "Enter a location" autocomplete = "off" >'
