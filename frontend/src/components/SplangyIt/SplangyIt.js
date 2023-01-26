// import { Map, GoogleApiWrapper } from 'google-maps-react';
// import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import './SplangyIt.css';


// const AnyReactComponent = ({ text }) => (<div>{text}</div>);

const google_maps_api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// const mapStyles = {
//   width: '400px',
//   height: '200px'
// };

function SplangyIt() {
  const [lat, setLat] = useState(37.24655751008692);
  const [lng, setLng] = useState(-121.85225651671853);
  const [zoomLevel, setZoomLevel] = useState(11);

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
      console.log('SUPPORTED!!')
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  // boku no: 37.24655751008692, -121.85225651671853
  // &center=37.24655751008692,-121.85225651671853

  //const mapCenter = { lat: lat ? lat : 37.24655751008692, lng: lng ? lng : -121.85225651671853 };
  const mapCenter = `${lat},${lng}`;
  console.log('TESTING MAP CENTER: ', mapCenter);

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
            <iframe id="map" width="100%" height="610px" style={{ border: "0" }} loading="lazy" allowFullScreen src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ9T_5iuTKj4ARe3GfygqMnbk&key=${google_maps_api_key}&zoom=11&center=${lat},${lng}`}></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplangyIt;

// https://www.google.com/maps/place/5676+Calmor+Ct,+San+Jose,+CA+95123/@37.2464038,-121.8544076,17z/data=!4m13!1m7!3m6!1s0x808e3183120b17b3:0x6e5a53926aa34582!2s5676+Calmor+Ct,+San+Jose,+CA+95123!3b1!8m2!3d37.2464038!4d-121.8522136!3m4!1s0x808e3183120b17b3:0x6e5a53926aa34582!8m2!3d37.2464038!4d-121.8522136
