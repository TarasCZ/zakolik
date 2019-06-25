const packageJson = require('../../package.json');

const appUrl = 'http://localhost:4200';

export const environment = {
  appName: 'Zakolik',
  envName: 'PROD',
  appUrl,
  apiUrl: 'http://localhost:4000',
  production: true,
  test: false,
  i18nPrefix: '',
  auth0Config: {
    domain: 'dev-l2w-mks0.eu.auth0.com',
    clientID: 'jiyDt6vp21wmCl7WlnlLNhhPoAyMt41A',
    redirectUri: `${appUrl}/callback`,
    responseType: 'id_token'
  },
  versions: {
    app: packageJson.version
  }
};
