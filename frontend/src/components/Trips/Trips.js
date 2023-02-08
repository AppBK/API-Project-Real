import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkReadBookings, thunkDeleteBooking } from '../../store/bookings';
import { RouterContext } from '../../context/RouterContext';
import EditTrip from './EditTrip';
import './Trips.css';

let key = 0;

export default function Trip() {
  const bookings = useSelector(state => state.bookings);
  const dispatch = useDispatch();

  const { modalId, setModalId } = useContext(RouterContext);

  const capture = (e) => {
    const splitModalId = e.target.id.split('-');
    const tempId = splitModalId[0] + '-' + splitModalId[1];
    setModalId(tempId);
  }

  useEffect(() => {
    if (modalId) {
      openEditBooking();
    }
  }, [modalId]);

  useEffect(() => {
    dispatch(thunkReadBookings());
  }, []);


  function openEditBooking() {
    const modalBackground = document.getElementById("edit-booking-modal-background");
    if (modalBackground) {
      modalBackground.style.visibility = "visible";
    }
    const form = document.getElementById(modalId);
    if (form) {
      form.style.visibility = "visible";
    }
  }

  const closeEditBooking = () => {
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

  const deleteBooking = (e) => {
    dispatch(thunkDeleteBooking(e.target.id));
  }


  return (
    <div id="trip-outermost">
      <div id="trip-inner">
        <div id="trip-title-div">
          <div>Trips</div>
        </div>
        <div id="trip-catalogue">
          {bookings?.Bookings?.map(booking => (
            <div key={++key}>
            <div className="your-bookings">
              <div style={{ marginRight: "8px" }}>
                <img src={booking.Spot.previewImage} style={{ width: "56px", height: "56px", borderRadius: "8px" }}></img>
              </div>
              <div style={{ padding: "4px 0px" }}>
                <div style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "4px" }}>{booking.Spot.city}</div>
                <div style={{ color: "#6C6C6C", fontSize: "12px"}}>{booking.startDate}, {booking.endDate}</div>
              </div>
              <div className="edit-delete-cont">
                <div>
                    <div id="edit-booking-modal-background" onClick={closeEditBooking}></div>
                    <EditTrip booking={booking} modal={setModalId}></EditTrip>
                    <button id={'booking-' + booking.id + '-button'} className="edit-delete" style={{ marginLeft: "8px" }} onClick={capture}>Edit</button>
                </div>
                  <div>
                    <button id={booking.id} className="edit-delete" onClick={(e) => deleteBooking(e)}>Cancel</button>
                  </div>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
