import { useState, useEffect, useContext } from 'react';
import { RouterContext } from '../../context/RouterContext';
import { thunkReviewCreate } from '../../store/reviews';
import { useDispatch } from 'react-redux';



export default function CreateReview({ spot }) {
  const { showCreateReview, setShowCreateReview } = useContext(RouterContext);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    let err = [];

    if (review) {
      if (review.length > 255) err.push("Review must be 255 chars or less");
    }

    setErrors(err);
  },[review]);



  const onSubmit = (e) => {
    e.preventDefault();

    const rev = {
      review,
      stars: rating
    }

  dispatch(thunkReviewCreate(spot.id, rev))
      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) setErrors(data.errors);
      // });

    setReview('');
    setRating(null);
    setErrors([]);
    setShowCreateReview(false);
  }

  return (
    <div id="create-rev-form">
      <div id="close-modal">
        <button id="close-x" onClick={() => setShowCreateReview(false)}>X</button>
      </div>
      <div id="error-div">
        <ul>
          {errors.map((err, idx) => (
            <li key={'error-' + idx} className="errors">{err}</li>
          ))}
        </ul>
      </div>
      <div id="form-flex">
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="review">Review:</label>
            <input name="review" type="text" value={review} onChange={(e) => setReview(e.target.value)}></input>
            <label htmlFor="rating">Rating:</label>
            <input name="rating" type="number" value={rating} onChange={(e) => setRating(e.target.value)}></input>
          </div>
          <button id="review-submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
