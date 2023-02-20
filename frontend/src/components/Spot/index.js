import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllSpotInfo } from "../../store/singleSpot";
import { useEffect, useContext, useState } from "react";
import './Spot.css';
import './main.css';
import AddImageModal from "../addImageModal";
import { thunkSpotDelete } from "../../store/spot";
import EditSpotModal from "../EditSpotModal";
import { RouterContext } from "../../context/RouterContext";
import Reviews from '../Reviews';
import { thunkReviewsRead } from '../../store/reviews';
import '../CreateReviewModal/CreateReview.css';
import { Helmet } from "react-helmet-async";
import { monetary, diffDates } from "../../util/utils";
import { thunkCreateBooking } from "../../store/bookings";

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}


const initDates = () => {
  const start = new Date();
  let end = new Date();
  end.setDate(end.getDate() + 5);

  const startString = formatDate(start); // returns date string in yyyy-mm-dd format!!
  const endString = formatDate(end);

  return [startString, endString];
}

const setNights = (d1, d2) => {
  const MS_PER_DAY = (24 * 60 * 60 * 1000);
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diff = date2 - date1;

  if (diff < 0) {
    return 0;
  }
  const numDays = Math.round(Math.abs((diff / MS_PER_DAY)));

  return numDays;
}


const Spot = ({ isLoaded }) => {
  // console.log('IS LOADED Spot: ', isLoaded);

  const dates = initDates();
  const history = useHistory();
  const dispatch = useDispatch();
  const { showEditSpot } = useContext(RouterContext);
  const user = useSelector(state => state.session);
  const [days, setDays] = useState(5);
  const [startDate, setStartDate] = useState(dates[0]);
  const [endDate, setEndDate] = useState(dates[1]);
  const [errors, setErrors] = useState([]);

  const { spotId } = useParams();

  const spots = useSelector(state => state.spotDetails);
  let spot = spots[+spotId];

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

  // const calculateNights = () => {
  //   if (startDate > endDate) {
  //     errors.push('Start date cannot be later than end date');
  //     return () => setDays(days);
  //   } else {
  //     return () => setDays(setNights(startDate, endDate));
  //   }
  // }

  const submitBooking = async (e) => {
    e.preventDefault();

    if (startDate > endDate || errors.length > 0) return null;

    const booking = {
      startDate,
      endDate
    }

    const data = await dispatch(thunkCreateBooking(booking, spot.id))
    .then(res => res.json())
    .catch(err => {
      try {
        return err.json();
      } catch (e) {
        return null;
      }
    });

    if (data) {
      console.log('DATA: ', data);
      if (data.error) {
        setErrors([...errors, data.error]);
      }
    } else {
      history.push('/trips');
    }
  }

  const inBoundsStart = (e) => {
    e.preventDefault();

    const tempErr = [];
    const temp = e.target.value > endDate ? startDate : e.target.value;

    if (temp === startDate) tempErr.push('Start date must be earlier than end date.');

    setErrors(tempErr);
    setDays(setNights(e.target.value, endDate));
    setStartDate(e.target.value);
  }

  const inBoundsEnd = (e) => {
    e.preventDefault();

    const tempErr = [];
    const temp = e.target.value < startDate ? endDate : e.target.value;

    if (temp === endDate) tempErr.push('Start date must be earlier than end date.');

    setErrors(tempErr);
    setDays(setNights(startDate, e.target.value));
    setEndDate(e.target.value);
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
    <>
    <Helmet>
      <title>{spot.name}</title>
        <link rel="shortcut icon" type="image/x-icon" href="/icons/favicon_io_splangybnb/favicon.ico" />
    </Helmet>
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
          <EditSpotModal spot={spot}/>
        </div>
        <div>
          <button className="spotButtons" onClick={deleteSpot}>Delete</button>
        </div>
      </div>)}
      <Reviews spot={spot} isLoaded={isLoaded} isAuthorized={isAuthorized} user={user}/>
        <div id="booking-outer">
          <div id="bookings-left-col">
            <div id="highlights">
              <div className="highlight-conts">
                <div className="highlight-icons">
                  <img src="/createSpot/highlights/cancellation.svg" style={{ width: "24px", height: "24px" }}></img>
                </div>
                <div>Free cancellation for 48 hours.</div>
              </div>
            </div>
            <div id="aircover">
              <div id="aircover-icon-div">
                <img src="/createSpot/aircover_no_host.webp" style={{ width: "123px", height: "26px" }}></img>
              </div>
              <div id="aircover-content">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
            </div>
          </div>
          <div id="bookings-right-col">
          <div id="booking-form">
            {errors.map(error => (
              <div className="booking-errors">{error}</div>
            ))}
            <div id="price-review-div">
              <div id="price-night-div">
                <div id="booking-price-div">{monetary(spot.price)}</div>
                <div id="night-div">night</div>
              </div>
              <div id="booking-reviews">
                <div id="star-div">{spot.numReviews ? withReviews : withoutReviews}</div><div id="rating-div">{spot.avgStarRating}</div><div className="dot-spacer-div">{dotSpacer}</div><div id="reviews-div">{spot.numReviews ? spot.numReviews + ' reviews' : null}</div>
              </div>
            </div>
            <form onSubmit={submitBooking}>
              <div id="outer-form-inputs">
                <div id="booking-input-left" className="booking-input-divs">
                  <label className="booking-input-labels" htmlFor="checkin">CHECK-IN</label>
                  <input className="booking-inputs" type="date" name="checkin" placeholder="Add date" value={startDate} onChange={(e) => inBoundsStart(e)}></input>
                </div>
                <div id="booking-input-right" className="booking-input-divs">
                  <label className="booking-input-labels" htmlFor="checkout">CHECKOUT</label>
                  <input className="booking-inputs" type="date" name="checkout" placeholder="Add date" value={endDate} onChange={(e) => inBoundsEnd(e)}></input>
                </div>
              </div>
              <button id="booking-submit-button" type="submit">Reserve</button>
            </form>
            <div id="below-form">
              <div style={{ color: "#656565", margin: "16px" }}>You won't be charged yet</div>
              <div id="booking-total">
                <div>${spot.price} x {days} nights</div>
                <div>{monetary(spot.price * days)}</div>
              </div>
            </div>
            <div id="booking-total-total">
              <div>Total before taxes</div>
              <div>{monetary(spot.price * days)}</div>
            </div>
          </div>
        </div>
        </div>
    </div>
    </>
  );
}


export default Spot;
