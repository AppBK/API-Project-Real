import { useEffect, useState } from 'react';
import Map from '../Map/Map';
import './SplangyIt.css';


// const AnyReactComponent = ({ text }) => (<div>{text}</div>);

const google_maps_api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


function SplangyIt() {
  // const [lat, setLat] = useState(37.24655751008692);
  // const [lng, setLng] = useState(-121.85225651671853);
  // const [zoomLevel, setZoomLevel] = useState(11);





  // boku no: 37.24655751008692, -121.85225651671853
  // &center=37.24655751008692,-121.85225651671853

  return (
    <div id="splangy-it-outermost">
      <div id="splangyit-main-content">
        <div id="estimate-map-div">
          <div id="estimate-container">
            <div id="pink-it">Splangybnb it.</div>
            <div id="could-earn">You could earn</div>
            <div id="big-gains">$1,500</div>
            <div id="nights"><span id="bold-nights-button">7 nights</span> at an estimated $223 a night</div>
            <div id="days-bar">
              <div id="grey-bar"></div>
              <div id="black-bar"><div draggable="true" id="black-balled"></div></div>
            </div>
            <div></div>
          </div>
          <div id="map-container">
            <Map id="map"></Map>
            {/* <div id="rounded-frame"></div>
            <div id="left-bottom-corner-cover"></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplangyIt;

// https://www.google.com/maps/place/5676+Calmor+Ct,+San+Jose,+CA+95123/@37.2464038,-121.8544076,17z/data=!4m13!1m7!3m6!1s0x808e3183120b17b3:0x6e5a53926aa34582!2s5676+Calmor+Ct,+San+Jose,+CA+95123!3b1!8m2!3d37.2464038!4d-121.8522136!3m4!1s0x808e3183120b17b3:0x6e5a53926aa34582!8m2!3d37.2464038!4d-121.8522136
// &callback=${window.initMap}
