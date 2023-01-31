import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RouterContext } from '../../context/RouterContext';
import Map from '../Map/Map';
import ReactSlider from 'react-slider';
import './SplangyIt.css';


// const AnyReactComponent = ({ text }) => (<div>{text}</div>);
let thumb;
let floater = document.createElement('div');
floater.id = "nights-floater-black";
let floater2 = document.createElement('div');
floater2.id = "nights-floater-white"
const google_maps_api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function SplangyIt() {
  const { userCity, locationServicesEnabled, setLocationServicesEnabled } = useContext(RouterContext);
  const [type, setType] = useState('Entire place');
  const [bedrooms, setBedrooms] = useState(2);
  const [currentSlider, setCurrentSlider] = useState(7);
  const [currentNights, setCurrentNights] = useState(7);
  const [pricePerNight, setPricePerNight] = useState(100);
  const [mapLoaded, setMapLoaded] = useState(locationServicesEnabled);


  const history = useHistory();

  const sliderMin = 1;
  const sliderMax = 30;

  // const daysThumb = () => {
  //   const thumb = document.getElementsByClassName('days-slider-thumb')[0];
  //   console.log('DAYS THUMB: ', thumb.ariaValueNow);
  // }

  // daysThumb();
  useEffect(() => {
    // We'll grab the element that is the Thumbnail of the slider on initial mount so we don't make this call over and over...
    thumb = document.getElementsByClassName('days-slider-thumb')[0];

    if (thumb.children.length === 0) {
      floater.innerHTML = `<div>${currentNights}&nbsp;</div><div>nights</div>`;
      thumb.append(floater);
      thumb.append(floater2)
    }
  }, []);

  useEffect(() => {
    setMapLoaded(locationServicesEnabled);
    console.log('LOCATION', locationServicesEnabled);
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
    blackout.style.visibility = 'hidden';
    tellUsModal.style.visibility = 'hidden';
  }

  const openModal = () => {
    const blackout = document.getElementById('blackout');
    const tellUsModal = document.getElementById('tell-us-modal');
    blackout.style.visibility = 'visible';
    tellUsModal.style.visibility = 'visible';
    // tellUsModal.style.transition = 'all 2s ease-in-out';
  }



  return (
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
            <div id="big-gains">${currentNights * pricePerNight}</div>
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
            <Map id="map"></Map>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplangyIt;

// https://www.google.com/maps/place/5676+Calmor+Ct,+San+Jose,+CA+95123/@37.2464038,-121.8544076,17z/data=!4m13!1m7!3m6!1s0x808e3183120b17b3:0x6e5a53926aa34582!2s5676+Calmor+Ct,+San+Jose,+CA+95123!3b1!8m2!3d37.2464038!4d-121.8522136!3m4!1s0x808e3183120b17b3:0x6e5a53926aa34582!8m2!3d37.2464038!4d-121.8522136
// &callback=${window.initMap}

/*
<div class="_1tllc1q"><video class="_e2l2kr" crossorigin="anonymous" playsinline="" preload="auto" style="object-fit: cover;" autoplay=""><source src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"></video></div>
*/



/*
<div role="dialog" tabindex="-1" class="gm-style-iw gm-style-iw-c" style="padding-right: 0px; padding-bottom: 0px; max-width: 498px; max-height: 479px; min-width: 0px;"><div class="gm-style-iw-d" style="overflow: scroll; max-height: 461px;"></div><button draggable="false" aria-label="Close" title="Close" type="button" class="gm-ui-hover-effect" style="background: none; display: block; border: 0px; margin: 0px; padding: 0px; text-transform: none; appearance: none; position: absolute; cursor: pointer; user-select: none; top: -6px; right: -6px; width: 30px; height: 30px;"><span style="-webkit-mask-image: url(&quot;data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22/%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3C/svg%3E&quot;); pointer-events: none; display: block; width: 14px; height: 14px; margin: 8px;"></span></button></div>
*/
