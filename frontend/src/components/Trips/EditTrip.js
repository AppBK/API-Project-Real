import { useState, useContext } from "react";
import { RouterContext } from "../../context/RouterContext";
import { thunkUpdateBooking } from "../../store/bookings";
import { useDispatch } from "react-redux";
import { monetary } from '../../util/utils';
import './EditTrip.css';

export default function EditTrip({ booking }) {
  const [editErrors, setEditErrors] = useState([]);
  const [startDateEdit, setStartDateEdit] = useState(booking.startDate);
  const [endDateEdit, setEndDateEdit] = useState(booking.endDate);
  const [days, setDays] = useState(6);
  const { modalId, setModalId } = useContext(RouterContext);
  const dispatch = useDispatch();

  const spot = booking.Spot;

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

  const submitBookingEdit = async (e, bookingId) => {
    e.preventDefault();

    if (startDateEdit > endDateEdit || editErrors.length > 0) return null;

    const booking = {
      startDate: startDateEdit,
      endDate: endDateEdit
    }

    const data = await dispatch(thunkUpdateBooking(booking, bookingId))
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
        setEditErrors([...editErrors, data.error]);
      }
    } else {
      const modalBackground = document.getElementById("edit-booking-modal-background");
      if (modalBackground) {
        modalBackground.style.visibility = "hidden";
      }

      const form = document.getElementById(modalId);
      if (form) {
        form.style.visibility = "hidden";
      }
      setModalId('');
    }
  }

  const inBoundsStartEdit = (e) => {
    e.preventDefault();

    const tempErr = [];
    const temp = e.target.value > endDateEdit ? startDateEdit : e.target.value;

    if (temp === startDateEdit) tempErr.push('Start date must be earlier than end date.');

    setEditErrors(tempErr);
    setDays(setNights(e.target.value, endDateEdit));
    setStartDateEdit(e.target.value);
  }

  const inBoundsEndEdit = (e) => {
    e.preventDefault();

    const tempErr = [];
    const temp = e.target.value < startDateEdit ? endDateEdit : e.target.value;

    if (temp === endDateEdit) tempErr.push('Start date must be earlier than end date.');

    setEditErrors(tempErr);
    setDays(setNights(startDateEdit, e.target.value));
    setEndDateEdit(e.target.value);
  }



  return (
    <div className="booking-form" id={'booking-' + booking.id}>
      {editErrors.map(error => (
        <div className="booking-errors">{error}</div>
      ))}
      {/* <div id="price-review-div">
        <div id="price-night-div">
          <div id="booking-price-div">{monetary(spot.price)}</div>
          <div id="night-div">night</div>
        </div>
        <div id="booking-reviews">
          <div id="star-div">{spot.numReviews ? withReviews : withoutReviews}</div><div id="rating-div">{spot.avgStarRating}</div><div className="dot-spacer-div">{dotSpacer}</div><div id="reviews-div">{spot.numReviews ? spot.numReviews + ' reviews' : null}</div>
        </div>
      </div> */}
      <form onSubmit={(e) => submitBookingEdit(e, booking.id)}>
        <div id="outer-form-inputs">
          <div id="booking-input-left" className="booking-input-divs">
            <label className="booking-input-labels" htmlFor="checkin">CHECK-IN</label>
            <input className="booking-inputs" type="date" name="checkin" placeholder="Add date" value={startDateEdit} onChange={(e) => inBoundsStartEdit(e)}></input>
          </div>
          <div id="booking-input-right" className="booking-input-divs">
            <label className="booking-input-labels" htmlFor="checkout">CHECKOUT</label>
            <input className="booking-inputs" type="date" name="checkout" placeholder="Add date" value={endDateEdit} onChange={(e) => inBoundsEndEdit(e)}></input>
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
  );
}
