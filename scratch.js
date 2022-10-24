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

/*
models: { User: User },
modelManager: ModelManager { models: [User], sequelize: [Circular * 1] },
connectionManager: <ref * 3 > ConnectionManager {
  sequelize: [Circular * 1],
    config: {
    database: undefined,
      username: undefined,
        password: null,
          host: 'localhost',
            port: undefined,
              pool: [Object],
                protocol: 'tcp',
                  native: false,
                    ssl: undefined,
                      replication: false,
                        dialectModule: null,
                          dialectModulePath: null,
                            keepDefaultTimezone: undefined,
                              dialectOptions: undefined
  },


  sequelize = new Sequelize(config.database, config.username, config.password, config);
*/


/* ROUTES object

ROUTES:  [Function: router] {
  params: {},
  _params: [],
  caseSensitive: undefined,
  mergeParams: undefined,
  strict: undefined,
  stack: [
    Layer {
      __handle: [Function],
      name: 'router',
      params: undefined,
      path: undefined,
      keys: [],
      regexp: /^\/api\/?(?=\/|$)/i,
      route: undefined
    },
    Layer {
      __handle: [Function: newFn],
      name: 'bound dispatch',
      params: undefined,
      path: undefined,
      keys: [],
      regexp: /^\/hello\/world\/?$/i,
      route: [Route]
    },
    Layer {
      __handle: [Function: newFn],
      name: 'bound dispatch',
      params: undefined,
      path: undefined,
      keys: [],
      regexp: /^\/api\/csrf\/restore\/?$/i,
      route: [Route]
    }
  ]
}



*/
