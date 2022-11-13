import './TypeCarousel.css';
import { types } from '../../assets/carousel/carousel';

const TypeCarousel = () => {
  return (
    <div id="carousel-container">
      <div id="carousel">
        {types.map(type => (
          <div className="carousel-button-container">
            <button className="carousel-button">
              <div className="maybe" style={{ width: "fit-content", display: "flex", height: "48px", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                <img className="thumbnail"  src={type.url} style={{ display: "block", width: "24px", height: "24px", color: "#717171", opacity: "0.6"}}></img>
                <span style={{display: "block"}}>{type.name}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TypeCarousel;


<img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" alt="" width="24" height="24"></img>
