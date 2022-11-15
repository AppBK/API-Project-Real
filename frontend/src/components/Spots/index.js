import './Spots.css';
import { useContext, useEffect, useState } from 'react';
import { RouterContext } from '../../context/RouterContext';
import { thunkGetAllSpots } from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import { monetary } from '../../util/utils';

const Spots = () => {
  const { spotType, setSpotType } = useContext(RouterContext);
  let spots = useSelector(state => state.spots);
  spots = Object.values(spots);

  const dispatch = useDispatch();

  useEffect(() => {
    // Get All Spots after initial render
    dispatch(thunkGetAllSpots(spotType));
  }, []);

  useEffect(() => {
    console.log('SPOTS: ', spots)
  }, [spotType]);

  if (!spots.length) return null;

  let currentSpots = spots.filter(spot => spot.category === spotType);

  if (!currentSpots.length && spotType) {
    dispatch(thunkGetAllSpots(spotType));
  }

  currentSpots = spots.filter(spot => spot.category === spotType);

  const withReviews = `<svg className="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "12px", width: "12px", fill: "currentcolor"}}><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fill-rule="evenodd" /></svg>`;
  const withoutReviews = `<svg className="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "12px", width: "12px", fill: "currentcolor", opacity: "0.5"}}><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fill-rule="evenodd" /></svg>`

  return (
    <div id="spots">
      {currentSpots.map(spot => (
        <button className="spot-selector">
        <div className="tile" key={spot.id}>
          <div className="preview-carousel">
            <img className="preview-img" src={spot.previewImage}></img>
            <svg className="preview-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", fill: "rgba(0, 0, 0, 0.5)", height: "24px", width: "24px", stroke: "var(--f-mkcy-f)", strokeWidth: "2", overflow: "visible" }}><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" /></svg>
          </div>
          <div className="preview-info">
            <div id="spot-info-top">
                <span className="preview-city-state">{spot.city}, {spot.state}</span><div className="preview-rating"><div className="star-container"><svg className="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "12px", width: "12px", fill: "currentcolor" }}><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fill-rule="evenodd" /></svg></div><div className="rating">{spot.avgRating}</div></div>
            </div>
            <div className="preview-price">{monetary(spot.price)} <span className="preview-night">night</span></div>
          </div>
        </div>
        </button>
      ))}
    </div>
  );
}

export default Spots;
