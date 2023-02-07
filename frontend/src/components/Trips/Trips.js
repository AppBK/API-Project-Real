import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkReadBookings } from '../../store/bookings';
import './Trips.css';

export default function Trip() {
  const { bookings } = useSelector(state => state.bookings);
  const dispatch = useDispatch();
  console.log('BOOKINGS: ', bookings);

  useEffect(() => {
    dispatch(thunkReadBookings());
  }, []);

  return (
    <div id="trip-outermost">
      <div id="trip-inner">
        <div id="trip-title-div">
          <div>Trips</div>
        </div>
        <div id="trip-catalogue">

        </div>
      </div>
    </div>
  );
}
