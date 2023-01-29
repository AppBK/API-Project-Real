import React, { useEffect, useState, useContext } from 'react'
import { RouterContext } from '../../context/RouterContext';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow } from '@react-google-maps/api';
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

function MyComponent() {
  const [lat, setLat] = useState(27.173891);
  const [lng, setLng] = useState(78.042068);
  const [activeMarker, setActiveMarker] = useState(null);
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(true);

  const { userCity, setUserCity } = useContext(RouterContext);


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

  useEffect(() => {
    getLocation();
  }, []);

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
    googleMapsApiKey: google_maps_api_key
  })

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    map.setZoom(12);

    setMap(map);
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


  const noLocationServices = <InfoWindow position={center} ><div id="info-content">It appears that you have Location Services disabled.</div></InfoWindow>
  const centralMarkerId = 1;
  const centralMarker = <MarkerF key={centralMarkerId} position={center} onClick={() => handleActiveMarker(centralMarkerId)}>{!locationServicesEnabled ? noLocationServices : null }</MarkerF>


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={() => setActiveMarker(null)}
    >
      { /* Child components, such as markers, info windows, etc. */}
      {centralMarker}
      {/* {markers.map(({ id, position }) => (
        <MarkerF
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
        </MarkerF>
      ))} */}
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
