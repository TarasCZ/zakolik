// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const packageJson = require('../../package.json');

const appUrl = 'http://localhost:4200';

export const environment = {
  appName: 'Zakolik',
  envName: 'DEV',
  appUrl,
  apiUrl: 'http://localhost:4000',
  production: false,
  test: false,
  i18nPrefix: '',
  auth0Config: {
    domain: 'dev-l2w-mks0.eu.auth0.com',
    clientID: 'jiyDt6vp21wmCl7WlnlLNhhPoAyMt41A',
    redirectUri: `${appUrl}/callback`,
    responseType: 'id_token',
  },
  versions: {
    app: packageJson.version
  }
};
