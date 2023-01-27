import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow } from '@react-google-maps/api';

const google_maps_api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '610px'
};


function MyComponent() {
  const [lat, setLat] = useState(37.24655751008692);
  const [lng, setLng] = useState(-121.85225651671853);
  const [activeMarker, setActiveMarker] = useState(null);

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
  }

  const onError = () => {
    console.log('NO SIRBE!!!');
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }

  useEffect(() => {
    getLocation();
  });

  const center = {
    lat: lat ? lat : 37.24655751008692,
    lng: lng ? lng : -121.85225651671853
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
      position: { lat: lat, lng: lng }
    }
  ];


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
      {markers.map(({ id, position }) => (
        <MarkerF
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
        </MarkerF>
      ))}
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
