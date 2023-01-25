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
