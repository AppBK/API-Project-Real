import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, useLocation, Redirect } from 'react-router-dom';
import { RouterContext } from "../../context/RouterContext";
import { thunkEditSpot } from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import { thunkSpotCreate } from '../../store/spot';
import './Reviews.css';
import { thunkReviewsRead } from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';


const withReviews = (<svg className="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "16px", width: "16px", fill: "currentcolor" }}><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd" /></svg>);
const withoutReviews = (<svg className="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "12px", width: "12px", fill: "currentcolor", opacity: "0.5" }}><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd" /></svg>);
const dotSpacer = (<svg className="dot-spacer bi bi-dot" width="16px" height="16px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
</svg>)

export default function Reviews({ spot, isLoaded, isAuthorized }) {
  const dispatch = useDispatch();

  let spotReviews = useSelector(state => state.reviews);
  console.log('spot reviews', spotReviews);
  console.log('SPOT? ', spot);


  const getDate = (review) => {
    let string = review.toString();
    return string.slice(0, 10);
  }

  const confirmPic = (ref) => {
    if (!ref) {
      return 'https://cdn.royalcanin-weshare-online.io/UCImMmgBaxEApS7LuQnZ/v2/eukanuba-market-image-puppy-beagle?w=5596&h=2317&rect=574,77,1850,1045&auto=compress,enhance';
    }
    return ref[0].url;
  }

  useEffect(() => {
    dispatch(thunkReviewsRead(spot.id));
  }, [dispatch])


  spotReviews = useSelector(state => state.reviews.Reviews[spot.id]);
  console.log('spot reviews', spotReviews);

  return (
    <>
    <div id="reviews-outer">
      {/* <div id="if-there-is-time-to-add-this-stuff"></div> */}
      <div id="avg-score-and-num-reviews">
        <div id="review-star-div">{spot.numReviews ? withReviews : withoutReviews}</div><div id="reviews-rating-div">{spot.avgStarRating}</div><div className="reviews-dot-spacer-div">{dotSpacer}</div><div id="num-reviews-div">{spot.numReviews}</div><div id="review-text-div">{spot.numReviews ? ' reviews' : null}</div>
      </div>
      <div id="rendered-reviews-container">
      {spotReviews && spotReviews.map(review => (
        <div className="review" key={review.firstName}>
          <div className="upper-rev">
            <div className="img-container">
              <img id="img" src={confirmPic(review.ReviewImages)}></img>
            </div>
            <div id="name-date-container">
              <h4 id="username">{review.User.firstName}</h4>
              <h5 id="review-date">{getDate(review.updatedAt)}</h5>
            </div>
            {isLoaded && isAuthorized && (<div id="edit-delete-container">
              <div>
                <button id="edit-button">Edit</button>
              </div>
              <div>
                <button id="delete-button">Delete</button>
              </div>
            </div>)}
          </div>
          <div className="review-text-container">
            <p className="review-text">{review.review}</p>
          </div>
        </div>))}
      </div>
    </div>
    <div id="create-review-div">
        <CreateReviewModal spot={spot}/>
    </div>
    </>
  );
}
