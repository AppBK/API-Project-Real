import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RouterContext } from '../../context/RouterContext';
import ReactSlider from 'react-slider';
import './SplangyIt.css';
import { monetary } from '../../util/utils';
import { StandaloneSearchBox, GoogleMap, useJsApiLoader, MarkerF, InfoWindow } from '@react-google-maps/api';


// const AnyReactComponent = ({ text }) => (<div>{text}</div>);
let thumb;
let floater = document.createElement('div');
floater.id = "nights-floater-black";
let floater2 = document.createElement('div');
floater2.id = "nights-floater-white"

let body = document.querySelector('body');

const google_maps_api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '610px'
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const libraries = ["places", "geometry"];

function SplangyIt() {
  const { userCity, setUserCity, locationServicesEnabled, setLocationServicesEnabled } = useContext(RouterContext);
  const [type, setType] = useState('Entire place');
  const [bedrooms, setBedrooms] = useState(2);
  const [currentSlider, setCurrentSlider] = useState(7);
  const [currentNights, setCurrentNights] = useState(7);
  const [pricePerNight, setPricePerNight] = useState(100);
  const [mapLoaded, setMapLoaded] = useState(locationServicesEnabled);
  const [activeMarker, setActiveMarker] = useState(null);
  const [searchResult, setSearchResult] = useState('');
  const [lat, setLat] = useState(27.173891);
  const [lng, setLng] = useState(78.042068);


  const history = useHistory();

  const sliderMin = 1;
  const sliderMax = 30;



  useEffect(() => {
    setMapLoaded(locationServicesEnabled);
  }, [locationServicesEnabled])

  const goHome = () => {
    history.push('/');
  }

  const setSliderPos = async (e) => {
    if (currentSlider > +thumb.ariaValueNow) {
      setCurrentSlider(+thumb.ariaValueNow);
      await setCurrentNights(+thumb.ariaValueNow);
      floater.innerHTML = `<div>${currentNights - 1}&nbsp;</div><div>nights</div>`
      return null;
    }
    setCurrentSlider(+thumb.ariaValueNow);
    await setCurrentNights(+thumb.ariaValueNow);
    floater.innerHTML = `<div>${currentNights + 1}&nbsp;</div><div>nights</div>`
  }

  const closeModal = () => {
    const blackout = document.getElementById('blackout');
    const tellUsModal = document.getElementById('tell-us-modal');
    blackout.style.animationDuration = '0.5s';
    blackout.style.animationName = 'fade-out';
    tellUsModal.style.animationDuration = '0.5s';
    tellUsModal.style.animationName = 'slidedown';
    blackout.style.visibility = 'hidden';
    tellUsModal.style.visibility = 'hidden';

    // setTimeout prevents the scrollbar from awkwardly popping onto the screen when the animation ends
    setTimeout(() => {
      body.style.overflow = "auto"; // Enable the scrollbar once more!
    }, 600);
  }

  const openModal = () => {
    body.style.overflow = "hidden"; // This removes the scrollbar while the modal is visible
    const blackout = document.getElementById('blackout');
    const tellUsModal = document.getElementById('tell-us-modal');
    blackout.style.animationDuration = '0.5s';
    blackout.style.animationName = 'fade-in';
    blackout.style.visibility = 'visible';
    tellUsModal.style.visibility = 'visible';
    tellUsModal.style.animationDuration = '0.5s';
    tellUsModal.style.animationName = 'slideup';
  }

  // Setup the SearchBar and GoogleMap

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


  function onLoadAutoComplete(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    let place = searchResult.getPlaces()[0];

    let tempLat;
    let tempLng;
    if (place) {
      tempLat = place.geometry.location.lat();
      tempLng = place.geometry.location.lng();
    }

    if (tempLat && tempLng) {
      setLat(tempLat);
      setLng(tempLng);
    }

    if (place.formatted_address) setUserCity(place.formatted_address);
  }

  const center = {
    lat: lat,
    lng: lng
  };



  let searchBar = <StandaloneSearchBox onPlacesChanged={onPlaceChanged} onLoad={onLoadAutoComplete}><input id="address-input" type="text" placeholder={userCity}></input></StandaloneSearchBox>
  let centralMarkerId = 1;
  let centralMarker = <MarkerF id="default-marker" key={centralMarkerId} position={center} onClick={() => handleActiveMarker(centralMarkerId)}></MarkerF>
  let renderMap = <GoogleMap id="my-map" mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={onLoad} onUnmount={onUnmount} onClick={() => setActiveMarker(null)}>{centralMarker}</GoogleMap>

  const initThumb = () => {
    thumb = document.getElementsByClassName('days-slider-thumb-0')[0];

    if (thumb) {
      if (thumb.children.length === 0) {
        floater.innerHTML = `<div>${currentNights}&nbsp;</div><div>nights</div>`;
        thumb.append(floater);
        thumb.append(floater2);
      }
    } else {
      setTimeout(() => {
        initThumb();
      }, 200);
    }
  }

  useEffect(() => {
    // We'll grab the element that is the Thumbnail of the slider on initial mount so we don't make this call over and over...
    initThumb();
  }, []);


  return isLoaded ? (
    <div id="splangy-it-outermost">
      <div id="blackout" onClick={closeModal}>
      </div>
      <div id="tell-us-modal" style={{ opacity: "1" }}>
        <div id="modal-inside-wrapper">
          <div id="modal-header">
            <div id="close-modal-background" onClick={closeModal}>
              <img id="close-modal" src="/createSpot/closeModal.svg"></img>
            </div>
            <div>Tell us about your place</div>
          </div>
          <div id="modal-rest">
            <div id="address-input-div">
              <div id="address-label">Address</div>
              {searchBar}
              <div id="pin-div"><img src="/createSpot/pin-icon-black.svg" style={{ width: '16px', height: '16px' }}></img></div>
            </div>
          </div>
        </div>
      </div>
      <div id="splangy-it-header">
        <div onClick={goHome} id="splangy-it-gohome">
          <img id="splangyit-icon-pink" src="/createSpot/airbnb-logo-pink.svg"></img>
        </div>
        <div id="ready-setup">
          <div id="ready-margin">Ready to Splangybnb it?</div>
          <button id="splangybnb-setup">
            <img id="add-spot-img" src="/createSpot/add-spot-icon.svg"></img>
            <div id="setup-label">Splangybnb Setup</div>
          </button>
        </div>
      </div>
      <div id="splangyit-main-content">
        <div id="estimate-map-div">
          <div id="estimate-container">
            <div id="pink-it">Splangybnb it.</div>
            <div id="could-earn">You could earn</div>
            <div id="big-gains">{monetary(currentNights * pricePerNight)}</div>
            <div id="nights"><span id="bold-nights-button">{currentNights} nights</span> at an estimated ${pricePerNight} a night</div>
            <div id="days-bar">
              <ReactSlider
                className='days-slider'
                trackClassName='days-slider-track'
                thumbClassName='days-slider-thumb'
                min={sliderMin}
                max={sliderMax}
                value={currentSlider}
                onChange={(e) => setSliderPos(e)}
              />
            </div>
            <button id="city-search-box" onClick={openModal}>
              <div id="like-it-is">
                <div id="position-search">
                  <img id="search-icon-pink" src="/createSpot/search-icon-pink.svg"></img>
                </div>
                <div id="position-info">
                  <div id="display-city">{userCity}</div>
                  <div id="position-listing-type">
                    <div id="display-type">{type} &middot;</div>
                    <div id="display-bedrooms">&nbsp;{bedrooms} bedrooms</div>
                  </div>
                </div>
              </div>
            </button>
            {!locationServicesEnabled && (<div id="need-more-info"><div className="more-info-content">Looks like we'll need some more info to provide you with an accurate quote.</div><div className="more-info-content" id="more-info-pink">Please use button below to get started.</div></div>)}
          </div>
          <div id="map-container">
            {renderMap}
          </div>
        </div>
      </div>
      {/* <div id="easy-setup-outer"> */}
        <div id="easy-setup">
          <div id="easy-setup-title">Splangybnb it easily with Splangybnb Setup</div>
          <div id="webp-cont">
            <img id="easy-webp" src="/createSpot/splangy-easy.webp" style={{ maxWidth: '1280px' }}></img>
          </div>
          <div id="easy-setup-details">
            <div className="detailBoxes">
              <div className="detailBoxHeading">One-to-one guidance from a Superhost</div>
              <div className="detailBoxContent">We’ll match you with a Superhost in your area, who’ll guide you from your first question to your first guest—by phone, video call, or chat.</div>
            </div>
            <div className="detailBoxes">
              <div className="detailBoxHeading">An experienced guest for your first booking</div>
              <div className="detailBoxContent">For your first booking, you can choose to welcome an experienced guest who has at least three stays and a good track record on Airbnb.</div>
            </div>
            <div className="detailBoxes">
              <div className="detailBoxHeading">Specialized support from Splangybnb</div>
              <div className="detailBoxContent">New Hosts get one-tap access to specially trained Community Support agents who can help with everything from account issues to billing support.</div>
            </div>
          </div>
        </div>
      {/* </div> */}
      <div id="air-cover">
        <div>
          <img id="aircover-logo" src="/createSpot/aircover.webp"></img>
        </div>
        <div id="top-to-bottom">Splangybnb it with top-to-bottom protection</div>

          <div id="cover-header">
            <div className="left-header"></div>
            <div className="left-col">Splangybnb</div>
            <div className="rightmost-col">Competitors</div>
          </div>

          <div className="top-row">
            <div className="left-header">Guest identity verification</div>
            <div className="left-col">
              <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#00A506", strokeWidth: "5.333333333333333", overflow: "visible", ariaLabel: "Airbnb included", role: "img", focusable: "false" }}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg>
            </div>
            <div className="rightmost-col">
              <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#00A506", strokeWidth: "5.333333333333333", overflow: "visible", ariaLabel: "Airbnb included", role: "img", focusable: "false" }}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg>
            </div>
          </div>
          <div className="second-row">
            <div className="second-content">
              Our comprehensive verification system checks details such as name, address, government ID and more to confirm the identity of guests who book on Splangybnb.
            </div>
          </div>

        <div className="top-row">
          <div className="left-header">Reservation screening</div>
          <div className="left-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#00A506", strokeWidth: "5.333333333333333", overflow: "visible", ariaLabel: "Airbnb included", role: "img", focusable: "false" }}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg>
          </div>
          <div className="rightmost-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#E12C32", strokeWidth: "5.333333333333333", overflow: "visible" }} aria-label="Competitors not included" role="img" focusable="false"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
          </div>
        </div>
        <div className="second-row">
          <div className="second-content">
            Our proprietary technology analyzes hundreds of factors in each reservation and blocks certain bookings that show a high risk for disruptive parties and property damage.
          </div>
        </div>

        <div className="top-row">
          <div className="left-header">$3M damage protection</div>
          <div className="left-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#00A506", strokeWidth: "5.333333333333333", overflow: "visible", ariaLabel: "Airbnb included", role: "img", focusable: "false" }}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg>
          </div>
          <div className="rightmost-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#E12C32", strokeWidth: "5.333333333333333", overflow: "visible" }} aria-label="Competitors not included" role="img" focusable="false"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
          </div>
        </div>
        <div className="second-row">
          <div className="second-content">
            Airbnb reimburses you for damage caused by guests to your home and belongings and includes these specialized protections:
          </div>
        </div>

        <div className="top-row add-border">
          <div className="left-header single-row">Art & valuables</div>
          <div className="left-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#00A506", strokeWidth: "5.333333333333333", overflow: "visible", ariaLabel: "Airbnb included", role: "img", focusable: "false" }}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg>
          </div>
          <div className="rightmost-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#E12C32", strokeWidth: "5.333333333333333", overflow: "visible" }} aria-label="Competitors not included" role="img" focusable="false"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
          </div>
        </div>

        <div className="top-row add-border">
          <div className="left-header single-row">Auto & boat</div>
          <div className="left-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#00A506", strokeWidth: "5.333333333333333", overflow: "visible", ariaLabel: "Airbnb included", role: "img", focusable: "false" }}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg>
          </div>
          <div className="rightmost-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#E12C32", strokeWidth: "5.333333333333333", overflow: "visible" }} aria-label="Competitors not included" role="img" focusable="false"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
          </div>
        </div>

        <div className="top-row add-border">
          <div className="left-header single-row">Pet damage</div>
          <div className="left-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#00A506", strokeWidth: "5.333333333333333", overflow: "visible", ariaLabel: "Airbnb included", role: "img", focusable: "false" }}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg>
          </div>
          <div className="rightmost-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#E12C32", strokeWidth: "5.333333333333333", overflow: "visible" }} aria-label="Competitors not included" role="img" focusable="false"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
          </div>
        </div>

        <div className="top-row add-border">
          <div className="left-header single-row">Income loss</div>
          <div className="left-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#00A506", strokeWidth: "5.333333333333333", overflow: "visible", ariaLabel: "Airbnb included", role: "img", focusable: "false" }}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg>
          </div>
          <div className="rightmost-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#E12C32", strokeWidth: "5.333333333333333", overflow: "visible" }} aria-label="Competitors not included" role="img" focusable="false"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
          </div>
        </div>

        <div className="top-row add-border">
          <div className="left-header single-row">Deep cleaning</div>
          <div className="left-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#00A506", strokeWidth: "5.333333333333333", overflow: "visible", ariaLabel: "Airbnb included", role: "img", focusable: "false" }}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg>
          </div>
          <div className="rightmost-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#E12C32", strokeWidth: "5.333333333333333", overflow: "visible" }} aria-label="Competitors not included" role="img" focusable="false"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
          </div>
        </div>


        <div className="top-row">
          <div className="left-header">$1M liability insurance</div>
          <div className="left-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#00A506", strokeWidth: "5.333333333333333", overflow: "visible", ariaLabel: "Airbnb included", role: "img", focusable: "false" }}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg>
          </div>
          <div className="rightmost-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#E12C32", strokeWidth: "5.333333333333333", overflow: "visible" }} aria-label="Competitors not included" role="img" focusable="false"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
          </div>
        </div>
        <div className="second-row">
          <div className="second-content">
            You're protected in the rare event that a guest gets hurt or their belongings are damaged or stolen.
          </div>
        </div>

        <div className="top-row">
          <div className="left-header">24-hour safety line</div>
          <div className="left-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#00A506", strokeWidth: "5.333333333333333", overflow: "visible", ariaLabel: "Airbnb included", role: "img", focusable: "false" }}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg>
          </div>
          <div className="rightmost-col">
            <svg className="cover-icons" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", fill: "none", height: "24px", width: "24px", stroke: "#E12C32", strokeWidth: "5.333333333333333", overflow: "visible" }} aria-label="Competitors not included" role="img" focusable="false"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
          </div>
        </div>
        <div className="second-row no-border">
          <div className="second-content">
            If you ever feel unsafe, our app provides one-tap access to specially-trained safety agents, day or night.
          </div>
        </div>

      </div>
      <div>
        <img id="footer-pad" src="/createSpot/aircover.webp"></img>
      </div>
    </div>
  ) : <></>
}

export default SplangyIt;
