const serverBaseUrl = 'http://localhost:7977';

export const environment = {
  production: false,
  storeDefaultCacheTimeInMilliSeconds: 5000,
  serverBaseUrl,
  apiUrl: `${serverBaseUrl}/api/`,
  enableConsole: true,
  env: 'local',
  parentOrigin: 'http://localhost:8584',
  defaultImage: 'images/banner-img.jpg',
};
