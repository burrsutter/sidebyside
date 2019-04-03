'use strict';

'use strict';

const test = require('tape');
const supertest = require('supertest');
const rhoaster = require('rhoaster');

const testEnvironment = rhoaster({
  deploymentName: 'nodejs-rest-http-crud',
  nodeVersion: '10.x'
});

testEnvironment.deploy()
  .then(runTests)
  .then(_ => test.onFinish(testEnvironment.undeploy))
  .catch(console.error);

function runTests (route) {
  // GET fruits
  test('/api/fruits', t => {
    t.plan(2);
    supertest(route)
      .get('/api/fruits')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        t.equal(Array.isArray(response.body), true, 'response is an Array');
        t.equal(response.body.length, 3, 'should be initialized with 3 items');
        t.end();
      });
  });

  // GET 1 fruit
  test('/api/fruit/:id', t => {
    t.plan(4);
    supertest(route)
      .get('/api/fruits/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        t.equal(Array.isArray(response.body), false, 'not an array returned');
        t.equal(response.body.id, 1, 'id is 1');
        t.equal(response.body.name, 'Apple', 'name is Apple');
        t.equal(response.body.stock, 10, 'stock is 10');
        t.end();
      });
  });

  // GET 1 fruit that doesn't exist
  test('/api/fruit/:id - does not exist', t => {
    t.plan(1);
    supertest(route)
      .get('/api/fruits/10')
      .expect(404)
      .expect('Content-Type', /text/)
      .then(response => {
        t.equal(response.text, 'Item 10 not found', 'return not found string');
        t.end();
      });
  });

  // POST a fruit
  test('POST /api/fruit/', t => {
    t.plan(4);
    const fruitData = {
      name: 'Banana',
      stock: 10
    };

    supertest(route)
      .post('/api/fruits')
      .send(fruitData)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        t.equal(Array.isArray(response.body), false, 'not an array returned');
        t.ok(response.body.id, 'has a new id field');
        t.equal(response.body.name, fruitData.name, `name is ${fruitData.name}`);
        t.equal(response.body.stock, fruitData.stock, `stock is ${fruitData.stock}`);

        // Clean up
        supertest(route).delete(`/api/fruits/${response.body.id}`).then(_ => ({}));
        t.end();
      });
  });

  // POST a fruit
  test('POST /api/fruit/ - send non json', t => {
    const fruitData = '{name: \'Banana\', stock: 10}';

    supertest(route)
      .post('/api/fruits')
      .send(fruitData)
      .expect(422)
      .then(() => {
        t.pass('should fail with 422');
        t.end();
      });
  });

  // PUT a fruit
  test('PUT /api/fruit/:id', t => {
    const fruitData = {
      name: 'put fruit',
      stock: 10
    };

    // First create the new fruit
    supertest(route)
      .post('/api/fruits')
      .send(fruitData)
      .expect(201)
      .then(response => {
        const {id} = response.body;

        const updatedFruit = {
          name: response.body.name,
          stock: 20
        };

        supertest(route)
          .put(`/api/fruits/${id}`)
          .send(updatedFruit)
          .expect(204)
          .then(() => {
            // Clean up
            t.pass('should return with an empty response');
            supertest(route).delete(`/api/fruits/${response.body.id}`).then(_ => ({}));
            t.end();
          });
      });
  });
}
