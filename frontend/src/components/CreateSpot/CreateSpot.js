import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, useLocation, Redirect } from 'react-router-dom';
import { RouterContext } from "../../context/RouterContext";
import { thunkEditSpot } from '../../store/spot';
import { useDispatch } from 'react-redux';
import { thunkSpotCreate } from '../../store/spot';


export default function CreateASpot() {
  const { showCreateSpot, setShowCreateSpot } = useContext(RouterContext);
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
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentURL = location.pathname;

  // useEffect(() => {
  //   //history.push(`/api/spots/${spotId}`);
  // },[showEditSpot]);

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
    setShowCreateSpot(false);
    history.push(`/spots/${newSpot.id}`);
  };



  return (
    <div id="outer-edit">
      <button onClick={() => setShowCreateSpot(false)} id="close-add-image">X</button>
      <div id="edit-form-container">
        <form>
          <div>
            <label>Address</label>
            <input name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
          </div>
          <div>
            <label>City</label>
            <input name="city" type="text" value={city} onChange={(e) => setCity(e.target.value)}></input>
          </div>
          <div>
            <label>State</label>
            <input name="state" type="text" value={state} onChange={(e) => setState(e.target.value)}></input>
          </div>
          <div>
            <label htmlFor='country'>country</label>
            <input name="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)}></input>
          </div>
          <div>
            <label>Lat</label>
            <input name="lat" type="number" value={lat} onChange={(e) => setLat(e.target.value)}></input>
          </div>
          <div>
            <label>Lng</label>
            <input name="lng" type="number" value={lng} onChange={(e) => setLng(e.target.value)}></input>
          </div>
          <div>
            <label>Name</label>
            <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
          </div>
          <div>
            <label>Description</label>
            <input name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)}></input>
          </div>
          <div>
            <label>Price</label>
            <input name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)}></input>
          </div>
          <div>
            <label>Category</label>
            <input name="price" type="text" value={category} onChange={(e) => setCategory(e.target.value)}></input>
          </div>
          <button type="submit" id="edit-submit" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>
      </div>
    </div>
  );
}
