import './TypeCarousel.css';
import { types } from '../../assets/carousel/carousel';
import { useState, useEffect, useContext } from 'react';
import { subPixels, addPixels } from '../../util/utils';
import { RouterContext } from '../../context/RouterContext';
import { useHistory } from 'react-router-dom';

let carousel;
let currentMargin;

const TypeCarousel = () => {
  const { spotType, setSpotType, prevType, setPrevType } = useContext(RouterContext);
  const [marginLeft, setMarginLeft] = useState("0px");
  const [showLeft, setShowLeft] = useState('hidden');
  const [showRight, setShowRight] = useState('visible');
  // const [active, setActive] = useState(false);


  const history = useHistory();

  useEffect(() => {
    carousel = document.getElementById('carousel');
    carousel.style.marginLeft = "0px";
    currentMargin = carousel.style.marginLeft;
  }, []);

  useEffect(() => {

    if (spotType === prevType) return;
    console.log('SPOT TYPE: ', spotType);
    let activeType = document.getElementById(spotType); // carousel-button-container
    console.log('ACTIVE TYPE: ', activeType);
    activeType.style.borderBottom = "2px solid black";
    let buttonCarousel = activeType.children[0];
    buttonCarousel.style.color = "black"
    let randDiv = buttonCarousel.children[0];
    let imgCarousel = randDiv.children[0];
    imgCarousel.style.opacity = "1";

    console.log('PREV TYPE: ', prevType);
    if (prevType) {
      let prevActiveType = document.getElementById(prevType);
      prevActiveType.style.borderBottom = "1px solid lightgrey";
      let childOne = prevActiveType.children[0];
      childOne.style.color = "#717171";
      let childTwo = childOne.children[0];
      let childThree = childTwo.children[0];
      childThree.style.opacity = "0.6";
    }
    console.log('BUTTON CHILDREN: ', imgCarousel);
    console.log('SPOT TYPE: ', spotType);
    history.push('/');
  }, [spotType]);

  const switchType = (e) => {
    let tempType = spotType;
    setSpotType(e.target.id);
    setPrevType(tempType);
  }

  const comingSoon = () => {
    history.push('/coming');
  }

  const swipeRight = () => {
    carousel = document.getElementById('carousel');
      currentMargin = subPixels(carousel.style.marginLeft, 700);
      carousel.style.marginLeft = currentMargin;
      console.log('carousel', carousel.style.marginLeft);

      if (currentMargin === "0px") {
        const leftButton = document.getElementById('fade-left');
        const fader = document.getElementById('fader');
        leftButton.style.visibility = 'hidden';
        fader.style.visibility = 'hidden'
      } else {
        const leftButton = document.getElementById('fade-left');
        const fader = document.getElementById('fader');
        fader.style.visibility = 'visible';
        leftButton.style.visibility = 'visible';
      }

      if (currentMargin === "-2100px") {
        const rightButton = document.getElementById('swipe-right-button');
        rightButton.style.visibility = 'hidden';
        setShowRight('none');
      } else {
        const rightButton = document.getElementById('swipe-right-button');
        rightButton.style.visibility = 'visible';
      }

      setMarginLeft(currentMargin);
  }

  const swipeLeft = () => {
    carousel = document.getElementById('carousel');
    currentMargin = addPixels(carousel.style.marginLeft, 700);
    carousel.style.marginLeft = currentMargin;
    console.log('carousel', carousel.style.marginLeft);

    if (currentMargin === "0px") {
      const leftButton = document.getElementById('fade-left');
      const fader = document.getElementById('fader');
      leftButton.style.visibility = 'hidden';
      fader.style.visibility = 'hidden'
    } else {
      const leftButton = document.getElementById('fade-left');
      const fader = document.getElementById('fader');
      fader.style.visibility = 'visible';
      leftButton.style.visibility = 'visible';
    }

    if (currentMargin === "-2100px") {
      const rightButton = document.getElementById('swipe-right-button');
      rightButton.style.visibility = 'hidden';
      setShowRight('none');
    } else {
      const rightButton = document.getElementById('swipe-right-button');
      rightButton.style.visibility = 'visible';
    }

    setMarginLeft(currentMargin);
  }

  const setType = (e) => {
    const element = document.getElementById(e.target.id);
    console.log(element);
  }

  return (
    <>
      <div id="fade-left">
        <button id="swipe-left-button" onClick={swipeLeft}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", fill: "none", height: "12px", width: "12px", stroke: "currentcolor", strokeWidth: "5.33333", overflow: "visible"}}><g fill="none"><path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932" /></g></svg>
        </button>
      </div>
      <div id="fader"></div>
    <div id="carousel-container">
      <div id="carousel">
        {types.map(type => (
          <div id={type.name} className="carousel-button-container" key={type.name}>
            <button id={type.name} type="button" className="carousel-button" onClick={(e) => switchType(e)}>
              <div id={type.name} className="maybe" style={{ width: "fit-content", display: "flex", height: "48px", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                <img id={type.name} className="thumbnail"  src={type.url} style={{ display: "block", width: "24px", height: "24px", color: "#717171"}}></img>
                <span id={type.name} style={{display: "block"}} className="type-name">{type.name}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
      <div id="fade-right"></div>
      <div id="fade-to-white">
          <button id="swipe-right-button" onClick={swipeRight}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", fill: "none", height: "12px", width: "12px", stroke: "currentcolor", strokeWidth: "5.33333", overflow: "visible"}}><g fill="none"><path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932" /></g></svg>
        </button>
        <div id="filter-button" onClick={comingSoon}>
          <div>
            <svg id="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={{display: "block", height: "14px", width: "14px", fill: "currentColor"}} aria-hidden="true" role="presentation" focusable="false"><path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" /></svg>
          </div>
          <div>Filters</div>
        </div>
      </div>
    </div>
    </>
  );
}

export default TypeCarousel;


//<img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" alt="" width="24" height="24"></img>
