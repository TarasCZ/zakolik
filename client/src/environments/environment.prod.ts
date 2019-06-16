const packageJson = require('../../package.json');

export const environment = {
  appName: 'Zakolik',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  versions: {
    app: packageJson.version
  }
};
