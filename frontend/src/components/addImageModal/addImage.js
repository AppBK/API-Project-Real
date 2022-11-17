import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { RouterContext } from "../../context/RouterContext";
import { thunkSpotAddImage } from '../../store/spot';
import { useDispatch } from 'react-redux';

const AddImage = () => {
  const [urlValue, setUrlValue] = useState();
  const [previewValue, setPreviewValue] = useState();
  const { showAddImage, setShowAddImage } = useContext(RouterContext);
  const { spotId } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {

  // }, [urlValue, previewValue]);

  async function addImage() {
    const response = await dispatch(thunkSpotAddImage(spotId, urlValue, previewValue));

    setShowAddImage(false);
    // if (response) {
    //   console.log('Success!!');
    //   setShowAddImage(false);
    // } else {
    //   alert('Something went wrong...');
    //   setShowAddImage(false);
    // }
  }

  return (
    <div id="add-image-spot">
      {/* <div id="close-modal"> */}
        <button onClick={() => setShowAddImage(false)} id="close-add-image">X</button>
      {/* </div> */}
      <div id="flex-modal">
      <form>
        <label for="url-input">
            URL:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" name="url-input" placeholder="url" value={urlValue} onChange={(e) => setUrlValue(e.target.value)}></input>
        </label>
        <label for="preview-input">
          Preview:&nbsp;&nbsp;
            <input type="text" name="preview-input" placeholder="true or false" value={previewValue} onChange={(e) => setPreviewValue(e.target.value)}></input>
        </label>
        <div id="button-holder">
          <button id="add-image-submit" onClick={() => addImage()}>Submit</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default AddImage;

// https://a0.muscache.com/im/pictures/prohost-api/Hosting-755197330978114075/original/4a026dd4-fedf-49d0-b57a-e962a32baa1d.jpeg?im_w=1200
