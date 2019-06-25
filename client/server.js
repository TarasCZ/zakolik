const express = require('express');
const compression = require('compression');
const https = require('https');
const http = require('http');
const fs = require('fs');
// const forceSSL = require('express-force-ssl');

const PORT = process.env.PORT || 4200;

const app = express();

app.use(compression());

app.use('/', express.static(__dirname + '/dist'));
app.use('*', express.static(__dirname + '/dist'));

let options;
try {
  options = {
    key: fs.readFileSync("/etc/letsencrypt/archive/zakolik.eu/privkey1.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/archive/zakolik.eu/fullchain1.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/archive/zakolik.eu/chain1.pem")
  };
} catch (err) {
  console.warn('No certificates found, skipping SSL server initialization');
}

if(options) {
  app.use(forceSSL);

  https.createServer(options, app)
    .listen(443, () => console.log(`App running with SSL on https://zakolik.eu:${PORT}`));
}

http.createServer(app)
  .listen(PORT, () => console.log(`App running on http://zakolik.eu:${PORT}`));
