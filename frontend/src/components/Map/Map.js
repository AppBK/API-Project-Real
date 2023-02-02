import React, { useEffect, useState, useContext } from 'react'
import { RouterContext } from '../../context/RouterContext';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow, Autocomplete, StandaloneSearchBox } from '@react-google-maps/api';
import './Map.css'

const google_maps_api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '610px'
};

const libraries = ["places", "geometry"];

// Las Vegas: 36.114647, -115.172813
// Taj Mahal: 27.173891, 78.042068
// Tokyo: 35.652832, 139.839478

// Foreign formatted_address length:
// Domestic formatted_address length: 4


function MyComponent() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [searchResult, setSearchResult] = useState('');

  const { setUserCity, locationServicesEnabled, setLocationServicesEnabled, lat, setLat, lng, setLng } = useContext(RouterContext);


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
  }, []);

  useEffect(() => {
    if (lat && lng) {
      setLocationServicesEnabled(true);
    }
  }, [lat]);

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
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



  // function onLoadAutoComplete(autocomplete) {
  //   setSearchResult(autocomplete);
  // }

  // function onPlaceChanged() {
  //   let place = searchResult.getPlaces()[0];

  //   let tempLat;
  //   let tempLng;
  //   if (place) {
  //     tempLat = place.geometry.location.lat();
  //     tempLng = place.geometry.location.lng();
  //   }

  //   if (tempLat && tempLng) {
  //     setLat(tempLat);
  //     setLng(tempLng);
  //   }

  //   if (place.formatted_address) setUserCity(place.formatted_address);
  // }


  // {!locationServicesEnabled ? noLocationServices : null}
  let noLocationServices = <InfoWindow position={center}><div id="info-content">It appears that you have Location Services disabled.</div></InfoWindow>
  let centralMarkerId = 1;
  // let searchBar = <input id="autocomplete" type="text"></input>;
  // let searchBar = <StandaloneSearchBox onPlacesChanged={onPlaceChanged} onLoad={onLoadAutoComplete}><input id="autoCP" type="text"></input></StandaloneSearchBox>
  let centralMarker = <MarkerF id="default-marker" key={centralMarkerId} position={center} onClick={() => handleActiveMarker(centralMarkerId)}>{!locationServicesEnabled ? noLocationServices : null}</MarkerF>
  let renderMap = <GoogleMap id="my-map" mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={onLoad} onUnmount={onUnmount} onClick={() => setActiveMarker(null)}>{centralMarker}</GoogleMap>

  console.log('CURRENT RESULT INITIAL: ', searchResult);


  return isLoaded ? (
    <>
    {/* {searchBar} */}
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
