import '../../context/Modal.css';
import './EditSpot.css';
import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, useLocation, Redirect } from 'react-router-dom';
import { RouterContext } from "../../context/RouterContext";
import { useDispatch } from 'react-redux';
import { thunkSpotEdit } from '../../store/singleSpot';


export default function EditSpot({ spot }) {
  const { showEditSpot, setShowEditSpot, setShowModal } = useContext(RouterContext);
  const { spotId } = useParams();

  const [name, setName] = useState(spot.name);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [address, setAddress] = useState(spot.address);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);
  const [edited, setEdited] = useState(showEditSpot);
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentURL = location.pathname;

  useEffect(() => {
    const err = [];

    if (name.length > 50) err.push('Name must be 50 chars or less');
    if (city.length > 50) err.push('City must be 50 chars or less');
    if (state.length > 50) err.push('State must be 50 chars or less');
    if (country.length > 50) err.push('Country must be 50 chars or less');
    if (address.length > 50) err.push('Address must be 50 chars or less');
    if (description.length > 250) err.push('Description must be 250 chars or less');

    setErrors(err);
  },[name, city, state, country, lat, lng, address, description, price]);





  async function handleSubmit(e) {
    e.preventDefault();

    if (errors.length) return;

    const spot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    }

    const response = await dispatch(thunkSpotEdit(spotId, spot)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    setAddress('');
    setCity('');
    setState('');
    setCountry('');
    setLat('');
    setLng('');
    setName('');
    setDescription('');
    setPrice('');

    setShowEditSpot(false);

    // history.push(`/spots/${spotId}`);
  };

  return (
    <>
      {showEditSpot && (
        <>
          <div id="modal-background" onClick={() => setShowModal(false)} /> {/* makes the background dark.. from: import '../../context/Modal.css';*/}
          <div id="outer-modal-div-flex">
            <div id="div-flex-upper-sliver">
              <button id="the-closer" onClick={() => setShowEditSpot(false)}>X</button>
              <div id="login-signup">Edit spot</div>
            </div>
            <div id="lower-portion">
              <form id="form-flex" onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <ul>
                  {errors.map((error, idx) => (
                    <li key={idx} className="error-list-items">{error}</li>
                  ))}
                </ul>
                <div id="combined-input-flex">
                  <input className="siamese-input-boxes" id="siamese-top" name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required></input>
                  <input className="siamese-input-boxes" name="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required></input>
                  <input className="siamese-input-boxes" name="state" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required></input>
                  <input className="siamese-input-boxes" name="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required></input>
                  <input className="siamese-input-boxes" name="lat" type="number" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" required></input>
                  <input className="siamese-input-boxes" name="lng" type="number" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" required></input>
                  <input className="siamese-input-boxes" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required></input>
                  <input className="siamese-input-boxes" name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></input>
                  <input className="siamese-input-boxes" id="siamese-bottom" name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required></input>
                </div>
                <button type="submit" id="add-image-button">Submit</button>
              </form>
            </div>
          </div>

        </>
      )}
    </>
  );
}


/*
    <div id="outer-edit">
      <button onClick={() => setShowEditSpot(false)} id="close-add-image">X</button>
      <div id="edit-form-container">
        <form>
          <div>
            <label>Address</label>
            <input name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
          </div>
          <div>
            <label>City</label>
            <input name="city" type="text" value={city} onChange={(e) => setCity(e.target.value)}></input>
            <input name="state" type="text" value={state} onChange={(e) => setState(e.target.value)}></input>
            <input name="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)}></input>
            <input name="lat" type="number" value={lat} onChange={(e) => setLat(e.target.value)}></input>
            <input name="lng" type="number" value={lng} onChange={(e) => setLng(e.target.value)}></input>
            <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
            <input name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)}></input>
            <input name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)}></input>
          </div>
          <button type="submit" id="edit-submit" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>
      </div>
    </div> */
    /*




*/
