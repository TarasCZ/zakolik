const packageJson = require('../../package.json');

const appUrl = 'https://zakolik.eu';

export const environment = {
  appName: 'Zakolik',
  envName: 'PROD',
  appUrl,
  apiUrl: 'https://zakolik.eu/api',
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
