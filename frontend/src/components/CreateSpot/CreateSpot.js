import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, useLocation, Redirect } from 'react-router-dom';
import { RouterContext } from "../../context/RouterContext";
import { thunkEditSpot } from '../../store/spot';
import { useDispatch } from 'react-redux';
import { thunkSpotCreate } from '../../store/spot';
import '../../context/Modal.css';
import './CreateSpot.css';


export default function CreateASpot() {
  const { showCreateSpot, setShowCreateSpot, showModal, setShowModal, spotType, setSpotType, prevType, setPrevType } = useContext(RouterContext);
  const { spotId } = useParams();
  console.log('spotId: ', spotId);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [edited, setEdited] = useState(showCreateSpot);
  const [category, setCategory] = useState(spotType);
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentURL = location.pathname;

  // useEffect(() => {
  //   //history.push(`/api/spots/${spotId}`);
  // },[showEditSpot]);

  const closeModal = () => {
    setShowModal(false);
    // history.push(currentURL);
  }

  const switchType = (e) => {
    let tempType = spotType;
    // console.log('tempTYPE: ', tempType);
    // console.log('TARGET VALUE: ', e.target.id);
    setSpotType(e.target.id);
    setPrevType(tempType);
  }

  // useEffect(() => {
  //   let activeType = document.getElementById(spotType); // carousel-button-container
  //   console.log('ACTIVE TYPE: ', activeType);
  //   activeType.style.borderBottom = "2px solid black";
  //   // activeType.style.borderTop = "2px solid black";
  //   let buttonCarousel = activeType.children[0];
  //   buttonCarousel.style.color = "black"
  //   let randDiv = buttonCarousel.children[0];
  //   let imgCarousel = randDiv.children[0];
  //   imgCarousel.style.opacity = "1";

  //   console.log('PREV TYPE: ', prevType);
  //   if (prevType) {
  //     let prevActiveType = document.getElementById(prevType);
  //     prevActiveType.style.borderBottom = "1px solid lightgrey";
  //   }
  //   console.log('BUTTON CHILDREN: ', imgCarousel);
  //   console.log('SPOT TYPE: ', spotType);
  // }, [spotType]);

  useEffect(() => {
    const err = [];

    if (address.length > 255) err.push('Address must be less than 255 chars');
    if (city.length > 50) err.push('City name must be less than 50 chars');
    if (state.length > 50) err.push('State name must be less than 50 chars');
    if (country.length > 50) err.push('Country name must be less than 50 chars');
    if (name.length > 50) err.push('Name must be less than 50 chars');
    if (description.length > 255) err.push('Description must be less than 255 chars');

    setErrors(err);

  },[name, city, state, country, lat, lng, address, description, price, category])

  async function handleSubmit(e) {
    e.preventDefault();

    const spot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      category
    }

    console.log('spotId: ', spotId);


    const newSpot = await dispatch(thunkSpotCreate(spot));

    // It will!!!
    let tempType = spotType;

    setShowCreateSpot(false);
    setPrevType(tempType);
    setSpotType(category);
  };

// .spotButtons

  return (
    <>
      {showCreateSpot && (
      <>
      <div id="modal-background" onClick={() => setShowModal(false)} /> {/* makes the background dark.. from: import '../../context/Modal.css';*/}
      <div id="outer-modal-div-flex">
        <div id="div-flex-upper-sliver">
          <button id="the-closer" onClick={() => setShowCreateSpot(false)}>X</button>
          <div id="login-signup">Create a spot</div>
        </div>
        <div id="lower-portion">
              <form id="form-flex" onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <ul>
                  {errors.map((error, idx) => (
                    <li key={idx} className="error-list-items">{error}</li>
                  ))}
                </ul>
                <div id="combined-input-flex">
                  <input id="siamese-top" className="siamese-input-boxes" type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                  <input className="siamese-input-boxes" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                  <input className="siamese-input-boxes" type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required></input>
                  <input className="siamese-input-boxes"type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required></input>
                  <input className="siamese-input-boxes" type="number" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} required></input>
                  <input className="siamese-input-boxes" type="number" placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} required></input>
                  <input className="siamese-input-boxes" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required></input>
                  <input className="siamese-input-boxes" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></input>
                  <input className="siamese-input-boxes" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                  <select id="siamese-bottom" className="siamese-input-boxes" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option disabled="disabled">Category</option>
                    <option>BeachFront</option>
                    <option>Cabins</option>
                    <option>OMG!</option>
                    <option>Earth Homes</option>
                    <option>Mansions</option>
                    <option>Amazing views</option>
                    <option>Luxe</option>
                    <option>Castles</option>
                    <option>Treehouses</option>
                    <option>Countryside</option>
                    <option>Design</option>
                    <option>Lakefront</option>
                    <option>Amazing pools</option>
                    <option>Skiing</option>
                    <option>Farms</option>
                    <option>Private rooms</option>
                    <option>Tiny Homes</option>
                    <option>Domes</option>
                    <option>National Parks</option>
                    <option>Vineyards</option>
                    <option>Lake</option>
                    <option>Off-the-grid</option>
                    <option>Ski/in-out</option>
                    <option>Boats</option>
                    <option>A-frames</option>
                    <option>Creative spaces</option>
                  </select>
                </div>
                <button type="submit" id="create-a-spot-button">Submit</button>
              </form>
        </div>
      </div>
      </>)}
    </>

    );
}


/*

<>
<div id="outer-modal-div-flex">
  <div id="div-flex-upper-sliver">
    <button id="the-closer" onClick={() => closeModal()}>X</button>
    <div id="login-signup">Login</div>
  </div>
  <div id="lower-portion">
    <form id="form-flex" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <h3 id="welcome">Welcome to Airbnb</h3>
      <div id="combined-input-flex">
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username or Email"
          className="siamese-input-boxes"
          id="siamese-top"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="siamese-input-boxes"
          id="siamese-bottom"
        />
      </div>
      <button type="submit" id="login-button">Log In</button>
      <button onClick={handleDemo} id="demo-user-button">Demo User</button>
    </form>
  </div>
</div>
    </>


    <form id="form-flex" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <button type="submit" id="login-button">Log In</button>
    </form>



*/


    // <div id="outer-edit">
    //   <div id="modal-background" onClick={() => setShowModal(false)} /> {/* makes the background dark.. from: import '../../context/Modal.css';*/}
    //   <button onClick={() => setShowCreateSpot(false)} id="close-add-image">X</button>
    //   <div id="edit-form-container">
    //     <form>
    //       <div>
    //         <label>Address</label>
    //         <input name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
    //       </div>
    //       <div>
    //         <label>City</label>
    //         <input name="city" type="text" value={city} onChange={(e) => setCity(e.target.value)}></input>
    //       </div>
    //       <div>
    //         <label>State</label>
    //         <input name="state" type="text" value={state} onChange={(e) => setState(e.target.value)}></input>
    //       </div>
    //       <div>
    //         <label htmlFor='country'>country</label>
    //         <input name="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)}></input>
    //       </div>
    //       <div>
    //         <label>Lat</label>
    //         <input name="lat" type="number" value={lat} onChange={(e) => setLat(e.target.value)}></input>
    //       </div>
    //       <div>
    //         <label>Lng</label>
    //         <input name="lng" type="number" value={lng} onChange={(e) => setLng(e.target.value)}></input>
    //       </div>
    //       <div>
    //         <label>Name</label>
    //         <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
    //       </div>
    //       <div>
    //         <label>Description</label>
    //         <input name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)}></input>
    //       </div>
    //       <div>
    //         <label>Price</label>
    //         <input name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)}></input>
    //       </div>
    //       <div>
    //         <label>Category</label>
    //         <input name="price" type="text" value={category} onChange={(e) => setCategory(e.target.value)}></input>
    //       </div>
    //       <button type="submit" id="edit-submit" onClick={(e) => handleSubmit(e)}>Submit</button>
    //     </form>
    //   </div>
    // </div>


    // https://images.mubicdn.net/images/cast_member/5030/cache-6050-1526604798/image-w856.jpg?size=256x




  /*
          ELEMENTS:

          Built Home animation
          1. <div class="_1tllc1q"><video class="_e2l2kr" autoplay="" crossorigin="anonymous" playsinline="" preload="auto" style="object-fit: cover;"><source src="https://stream.media.muscache.com/KeNKUpa01dRaT5g00SSBV95FqXYkqf01DJdzn01F1aT00vCI.mp4?v_q=high"></video><div class="_15xb09ct" style="transition-duration: 800ms;"><div class="_1h6n1zu" role="presentation" aria-hidden="true" style="display: inline-block; vertical-align: bottom; height: 100%; width: 100%; min-height: 1px;"><img class="_9ofhsl" aria-hidden="true" alt="" elementtiming="LCP-target" src="https://a0.muscache.com/4ea/air/v2/pictures/d7cb2e2b-f9b5-44e1-b510-44eaaf67889b.jpg" data-original-uri="https://a0.muscache.com/4ea/air/v2/pictures/d7cb2e2b-f9b5-44e1-b510-44eaaf67889b.jpg" style="object-fit: cover; vertical-align: bottom;"><div class="_15p4g025" style="background-image: url(&quot;https://a0.muscache.com/4ea/air/v2/pictures/d7cb2e2b-f9b5-44e1-b510-44eaaf67889b.jpg&quot;); background-size: cover;"></div></div></div></div>

          Partially Built home
          2. <div class="_1tllc1q"><video class="_e2l2kr" autoplay="" crossorigin="anonymous" playsinline="" preload="auto" style="object-fit: cover;"><source src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"></video></div>
          */


/*
Welcome video:

<div class="_16s0wug"><div class="_1tllc1q"><video class="_e2l2kr" aria-label="Brian Chesky, CEO of Airbnb, welcomes new Hosts to Airbnb." crossorigin="anonymous" playsinline="" preload="auto" style="object-fit: cover;" src="blob:https://www.airbnb.com/b6cf9f6e-bfc2-4c13-b1f7-09df1be27d52"><source src="https://stream.media.muscache.com/aRvUnNwsZ4XCcjkXwSXwP1jcO7oZcLszmCZjN7pbG200.m3u8"></video><div class="_15xb09ct" style="transition-duration: 800ms;"><div class="_1h6n1zu" role="presentation" aria-hidden="true" style="display: inline-block; vertical-align: bottom; height: 100%; width: 100%; min-height: 1px;"><img class="_9ofhsl" aria-hidden="true" alt="" elementtiming="LCP-target" src="https://a0.muscache.com/pictures/772c41f0-0739-4f3b-8a22-9e1244d2050b.jpg" data-original-uri="https://a0.muscache.com/pictures/772c41f0-0739-4f3b-8a22-9e1244d2050b.jpg" style="object-fit: cover; vertical-align: bottom;"><div class="_15p4g025" style="background-image: url(&quot;https://a0.muscache.com/pictures/772c41f0-0739-4f3b-8a22-9e1244d2050b.jpg&quot;); background-size: cover;"></div></div></div><div class="c1x8gg1z dir dir-ltr"><button aria-label="Play again" type="button" class="c1tlddld dir dir-ltr"><span class="i1ejo1e6 dir dir-ltr"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 32px; width: 32px; fill: currentcolor;"><path d="M17 11h6.984C22.158 8.575 19.262 7 16 7 10.486 7 6 11.486 6 17s4.486 10 10 10c4.829 0 8.87-3.441 9.798-8h4.042c-.975 6.773-6.8 12-13.84 12-7.72 0-14-6.28-14-14S8.28 3 16 3a13.94 13.94 0 0 1 10 4.223V2h4v10c0 1.654-1.346 3-3 3H17v-4z"></path></svg></span></button></div></div></div>
*/
