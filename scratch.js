fetch('/api/test', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "TUOe3ViM-mH8lNMuTAaeuoEWYlluneeiYKZg"
  },
  body: JSON.stringify({ hello: 'world' })
}).then(res => res.json()).then(data => console.log(data));


// XSRF - TOKEN: "8RYYSUQZ-WIOAv6_zvY7scL6nz-oqeMKY-cI"
// 8RYYSUQZ - WIOAv6_zvY7scL6nz - oqeMKY - cI
// "Jha08ENE-Vq8riXyl19qsJH5jfkoUKD5wAfw"


// fMD1kLAG-FuGeujv5LRN-SMP-Iko4XcvNquU
// "iyBwf9N7-aGm_UmPBrzIm4xKuvtCL2i3wMQQ"


"TUOe3ViM-mH8lNMuTAaeuoEWYlluneeiYKZg"
