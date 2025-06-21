const serverBaseUrl = window.location.origin;

export const environment = {
  production: true,
  storeDefaultCacheTimeInMilliSeconds: 5000,
  serverBaseUrl,
  apiUrl: `${serverBaseUrl}/api/`,
  enableConsole: false,
  env: 'prod',
  parentOrigin: 'https://schoolingjet.com',
  defaultImage: 'images/banner-img.jpg',
};
