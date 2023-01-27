// Initialize and add the map
function initMap() {
  // The location of Uluru
  console.log('INIT MAP!!')
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru

  window.onload = () => {
    console.log('THERE')
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new window.google.maps.Marker({
      position: uluru,
      map: map,
    });
  }

  // if (!window.google) {
  //   setTimeout(initMap, 100);
  //   console.log("not there yet");
  // } else {
  //   console.log('THERE')
  //   const map = new window.google.maps.Map(document.getElementById("map"), {
  //     zoom: 4,
  //     center: uluru,
  //   });
  //   // The marker, positioned at Uluru
  //   const marker = new window.google.maps.Marker({
  //     position: uluru,
  //     map: map,
  //   });
  // }
}

window.initMap = initMap;
