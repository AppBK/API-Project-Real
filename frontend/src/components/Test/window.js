//Initialize and add the map
function initMap() {
  // The location of Uluru
  console.log('INIT MAP!!')
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru

    if (window.google && window.google.maps) {
      console.log('FOUND GOOGLE OBJECT')
      const mapContainer = document.getElementById("map");
      console.log('MAP CONTAINER', mapContainer);

      const map = new window.google.maps.Map(mapContainer, {
        zoom: 4,
        center: uluru,
      });
      console.log('MAP OBJECT: ', map)
      // The marker, positioned at Uluru
      const marker = new window.google.maps.Marker({
        position: uluru,
        map: map,
      });
    } else {
      setTimeout(() => {
        initMap();
      }, 500);
    }
}

// const initG = () => {
//   ;
// }


// Initialize and add the map
// function initMap() {
//   // The location of Uluru
//   const uluru = { lat: -25.344, lng: 131.031 };
//   // The map, centered at Uluru
//   const forNow = document.createElement('div');
//   forNow.style.visibility = 'hidden';
  // document.body.appendChild(forNow);
  // const map = new google.maps.Map(forNow, {
  //   zoom: 4,
  //   center: uluru,
  // });
  // // The marker, positioned at Uluru
  // const marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map,
  // });
// }

window.initMap = initMap;

// window.initG = initG;
// window.initMap = initMap;
