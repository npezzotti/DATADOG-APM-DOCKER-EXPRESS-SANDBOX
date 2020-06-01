const bunyan = require('bunyan');
const debugLogger = bunyan.createLogger({
  name: 'dd-trace',
  level: 'trace'
});

const tracer = require('dd-trace').init({
  hostname: 'datadog-agent',
  port: 8126,
  logger: {
    debug: message => debugLogger.trace(message),
    error: err => debugLogger.error(err)
  },
  debug: true,
  analytics: true, 
  runtimeMetrics: true,
  env: 'apm-sandbox',
  tags: { 
    creator: 'Nathan Pezzotti'
  }
});

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world from an Express container!');
});

app.listen(8080, () => {
  console.log('App listening on port 8080!');
});
