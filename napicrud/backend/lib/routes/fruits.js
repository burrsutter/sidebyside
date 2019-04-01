'use strict';

const express = require('express');
/* eslint new-cap: "warn" */
const router = express.Router();

const validations = require('../validations');
const fruits = require('../api/fruits');

router.get('/fruits/:id', (request, response) => {
  const {id} = request.params;
  fruits.find(id).then(result => {
    if (result.rowCount === 0) {
      response.status(404);
      return response.send(`Item ${id} not found`);
    }
    return response.send(result.rows[0]);
  }).catch(() => {
    response.sendStatus(400);
  });
});

router.get('/fruits', (request, response) => {
  fruits.findAll().then(results => {
    response.send(results.rows);
  }).catch(() => {
    response.sendStatus(400);
  });
});

router.post('/fruits', validations.validateCreateRequest, (request, response) => {
  const {name, stock} = request.body;
  return fruits.create(name, stock).then(result => {
    response.status(201);
    return response.send(result.rows[0]);
  }).catch(err => {
    response.status(400);
    response.send(err);
  });
});

router.put('/fruits/:id', validations.validateUpdateRequest, (request, response) => {
  const {name, stock} = request.body;
  const id = parseInt(request.params.id);
  fruits.update({name, stock, id}).then(result => {
    if (result.rowCount === 0) {
      response.status(404);
      return response.send(`Unknown item ${id}`);
    }
    response.status(200);
    return response.send(result.rows[0]);
  }).catch(err => {
    response.status(400);
    response.send(err);
  });
});

router.delete('/fruits/:id', (request, response) => {
  const {id} = request.params;
  fruits.remove(id).then(result => {
    if (result.rowCount === 0) {
      response.status(404);
      return response.send(`Unknown item ${id}`);
    }
    return response.sendStatus(204);
  }).catch(err => {
    response.status(400);
    response.send(err);
  });
});

module.exports = router;
