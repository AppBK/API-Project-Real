import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { RouterContext } from "../../context/RouterContext";
import { thunkSpotAddImage } from '../../store/singleSpot';
import { useDispatch } from 'react-redux';

console.log('THUNK IMAGE: ', thunkSpotAddImage);

const AddImage = () => {
  const [urlValue, setUrlValue] = useState('');
  const [previewValue, setPreviewValue] = useState('');
  const [errors, setError] = useState([]);
  const { showAddImage, setShowAddImage, setShowModal } = useContext(RouterContext);
  const { spotId } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();


  async function addImage(e) {
    e.preventDefault();

    console.log('PREVIEW VALUE: ', previewValue);

    if (previewValue !== 'false' && previewValue !== 'true') {
      setError(['Preview value must be a boolean (true or false)']);
    } else {
      const response = await dispatch(thunkSpotAddImage(spotId, urlValue, previewValue)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setError(data.errors);
        }
      );

      setShowAddImage(false);
    }
  }

  return (
    <>
      <div id="modal-background" onClick={() => setShowModal(false)} /> {/* makes the background dark.. from: import '../../context/Modal.css';*/}
      <div id="add-image-spot">
        <div id="div-flex-upper-sliver">
          <button id="the-closer" onClick={() => setShowAddImage(false)}>X</button>
          <div id="add-image">Add an image</div>
        </div>
        <div id="lower-portion">
          <form id="form-flex" onSubmit={(e) => addImage(e)} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx} className="error-list-items">{error}</li>
              ))}
            </ul>
            <div id="siamese-inputs-img">
              <input id="siamese-top" className="siamese-input-boxes" type="url" name="url-input" placeholder="url" value={urlValue} onChange={(e) => setUrlValue(e.target.value)} required></input>
              <input id="siamese-bottom" className="siamese-input-boxes" type="text" name="preview-input" placeholder="true or false" value={previewValue} onChange={(e) => setPreviewValue(e.target.value)} required></input>
            </div>
            <button type="submit" id="add-image-button">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddImage;

// https://a0.muscache.com/im/pictures/prohost-api/Hosting-755197330978114075/original/4a026dd4-fedf-49d0-b57a-e962a32baa1d.jpeg?im_w=1200


/*
  <div id="div-flex-upper-sliver">
    <button id="the-closer" onClick={() => setShowCreateSpot(false)}>X</button>
    <div id="login-signup">Add an image</div>
  </div>
  <div id="lower-portion">
  </div>


              <form id="form-flex" onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <ul>
                  {errors.map((error, idx) => (
                    <li key={idx} className="error-list-items">{error}</li>
                  ))}
                </ul>
              </form>



*/
