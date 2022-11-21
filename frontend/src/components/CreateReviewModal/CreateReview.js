import { useState, useEffect, useContext } from 'react';
import { RouterContext } from '../../context/RouterContext';
import { thunkReviewCreate } from '../../store/reviews';
import { useDispatch } from 'react-redux';



export default function CreateReview({ spot }) {
  const { showCreateReview, setShowCreateReview, setShowModal } = useContext(RouterContext);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    let err = [];

    if (review) {
      if (review.length > 255) err.push("Review must be 255 chars or less");
    }
    if (rating < 1 || rating > 5) err.push('Rating must be a number between 1 and 5');

    setErrors(err);
  },[review, rating]);


  const onSubmit = async (e) => {
    e.preventDefault();

    if (errors.length) return;

    const rev = {
      review,
      stars: rating
    }

    await dispatch(thunkReviewCreate(spot.id, rev)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          errors.push(data.errors);
          alert(data.errors);
        }
      });

      if (errors.length) return;


      setReview('');
      setRating('');
      setErrors([]);
      setShowCreateReview(false);
  }

  return (
    <>
      <div id="modal-background" onClick={() => setShowModal(false)} /> {/* makes the background dark.. from: import '../../context/Modal.css';*/}
      <div id="add-review-spot">
        <div id="div-flex-upper-sliver">
          <button id="the-closer" onClick={() => setShowCreateReview(false)}>X</button>
          <div id="add-image">Add a review</div>
        </div>
        <div id="lower-portion">
          <form id="form-flex" onSubmit={(e) => onSubmit(e)} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx} className="error-list-items">{error}</li>
              ))}
            </ul>
            <div id="siamese-inputs-rev">
              <input id="siamese-top" className="siamese-input-boxes" type="text" name="review-input" placeholder="Review" value={review} onChange={(e) => setReview(e.target.value)} required></input>
              <input id="siamese-bottom" className="siamese-input-boxes" type="number" name="rating-input" placeholder="Rating between 1 and 5" value={rating} onChange={(e) => setRating(e.target.value)} required></input>
            </div>
            <button type="submit" id="add-image-button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

/*
    <div id="outer-edit">
      <button onClick={() => setShowEditSpot(false)} id="close-add-image">X</button>
      <div id="edit-form-container">
        <form>
          <div>


          </div>
          <div>
                     <input name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
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
