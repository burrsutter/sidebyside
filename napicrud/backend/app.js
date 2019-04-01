'use strict';

/*
 *
 *  Copyright 2016-2017 Red Hat, Inc, and individual contributors.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const probe = require('kube-probe');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// Expose the license.html at http[s]://[host]:[port]/licences/licenses.html
app.use('/licenses', express.static(path.join(__dirname, 'licenses')));

let isOnline = true;

//TODO: Add routes

const db = require('./lib/db');
const fruits = require('./lib/routes/fruits');

app.use('/api', fruits);

db.init().then(() => {
  console.log('Database init\'d');
}).catch(err => {
  console.log(err);
});


app.use('/api/stop', (request, response) => {
  isOnline = false;
  return response.send('Stopping HTTP server');
});

const options = {
  readinessURL: '/health',
  livenessURL: '/health',
  livenessCallback: (request, response) => {
    return isOnline ? response.send('OK') : response.sendStatus(500);
  }
};

probe(app, options);

module.exports = app;
