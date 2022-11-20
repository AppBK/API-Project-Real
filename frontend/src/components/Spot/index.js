import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllSpotInfo } from "../../store/singleSpot";
import { useEffect, useContext } from "react";
import './Spot.css';
import AddImageModal from "../addImageModal";
import { thunkSpotDelete } from "../../store/spot";
import EditSpotModal from "../EditSpotModal";
import { RouterContext } from "../../context/RouterContext";
import Reviews from '../Reviews';
import { thunkReviewsRead } from '../../store/reviews';
import '../CreateReviewModal/CreateReview.css';

const Spot = ({ isLoaded }) => {
  // console.log('IS LOADED Spot: ', isLoaded);
  const history = useHistory();
  const dispatch = useDispatch();
  const { showEditSpot } = useContext(RouterContext);
  const user = useSelector(state => state.session);

  const { spotId } = useParams();



  const spots = useSelector(state => state.spotDetails);
  let spot = spots[+spotId];

  // console.log('RENDERING A SPOT: ', spots);

  // let spotReviews = useSelector(state => state.reviews.Reviews[spotId]);

  // if (!spotReviews) {
  //   dispatch(thunkReviewsRead(spotId));
  // }

  // spotReviews = useSelector(state => state.reviews.Reviews[spotId]);

  // let validatedReviews;
  // if (!spotReviews) validatedReviews = {}

  function deleteSpot() {
    dispatch(thunkSpotDelete(spotId));

    history.push('/');
  }

  useEffect(() => {
    if (!spot) {
      dispatch(thunkGetAllSpotInfo(spotId));
    }
  }, [dispatch]);

  if (!spot) return null;

  let isAuthorized;
  if (user['user']) {
    if (user.user.id === spot.ownerId) {
      isAuthorized = true;
    }
  }

  // NOTE: Does not touch store...
  if (spot.SpotImages.length < 5) {
    let length = spot.SpotImages.length;
    let filler = 5 - length;
    const puppy = 'https://cdn.royalcanin-weshare-online.io/UCImMmgBaxEApS7LuQnZ/v2/eukanuba-market-image-puppy-beagle?w=5596&h=2317&rect=574,77,1850,1045&auto=compress,enhance';
    const img = { url: puppy, preview: true};
    for (let i = 0; i < filler; i++) {
      spot.SpotImages.push(img);
    }
  }

  const withReviews = (<svg className="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "12px", width: "12px", fill: "currentcolor" }}><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd" /></svg>);
  const withoutReviews = (<svg className="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "12px", width: "12px", fill: "currentcolor", opacity: "0.5" }}><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd" /></svg>);
  const dotSpacer = (<svg className="dot-spacer bi bi-dot" width="16px" height="16px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
  </svg>)

  // style = {{ width: "100px", height: "100px" }

  return (
    <div className="spot-page">
      <div id="inner-spot-cont">
        <div id="header-container">
          <div id="name-div">
            <h2 id="spot-name" style={{fontSize: "2em"}}>{spot.name}</h2>
          </div>
          <div id="header-bottom">
            <div id="star-div">{spot.numReviews ? withReviews : withoutReviews}</div><div id="rating-div">{spot.avgStarRating}</div><div className="dot-spacer-div">{dotSpacer}</div><div id="reviews-div">{spot.numReviews ? spot.numReviews + ' reviews' : null}</div><div className="dot-spacer-div">{dotSpacer}</div><div>{spot.city}, {spot.state}, {spot.country}</div>
          </div>
        </div>
        <div id="preview-images">
          <div id="big-boy"><img src={spot.SpotImages[0].url} style={{ width: "100%", height: "100%" }}></img></div>
          <div id="upper-left">
            <img src={spot.SpotImages[1].url} style={{ width: "100%", height: "100%" }}></img>
          </div>
          <div id="upper-right">
            <img src={spot.SpotImages[2].url} style={{ width: "100%", height: "100%" }}></img>
          </div>
          <div id="lower-left">
            <img src={spot.SpotImages[3].url} style={{ width: "100%", height: "100%" }}></img>
          </div>
          <div id="lower-right">
            <img src={spot.SpotImages[4].url} style={{ width: "100%", height: "100%" }}></img>
          </div>
        </div>
      </div>
      {isLoaded && isAuthorized && (<div id="user-options-menu">
        <div>
          <AddImageModal />
        </div>
        <div>
          <EditSpotModal />
        </div>
        <div>
          <button className="spotButtons" onClick={deleteSpot}>Delete</button>
        </div>
      </div>)}
      <Reviews spot={spot} isLoaded={isLoaded} isAuthorized={isAuthorized}/>
    </div>
  );
}


export default Spot;
