'use strict';

const test = require('tape');
const proxyquire = require('proxyquire');

const mockDb = {
  query: () => {
    return Promise.resolve();
  }
};

const fruits = proxyquire('../lib/api/fruits', {
  '../db': mockDb
});

test('test api methods', t => {
  t.equal(typeof fruits.find, 'function', 'find method should be a function');
  t.equal(typeof fruits.findAll, 'function', 'findAll method should be a function');
  t.equal(typeof fruits.create, 'function', 'create method should be a function');
  t.equal(typeof fruits.update, 'function', 'update method should be a function');
  t.equal(typeof fruits.remove, 'function', 'remove method should be a function');

  t.end();
});

test('test find all', t => {
  const result = fruits.findAll();
  t.equal(result instanceof Promise, true, 'should return a promise');
  t.end();
});

test('test find', t => {
  const result = fruits.find('id');
  t.equal(result instanceof Promise, true, 'should return a promise');
  t.end();
});

test('test create', t => {
  const result = fruits.create('name', 'stock');
  t.equal(result instanceof Promise, true, 'should return a promise');
  t.end();
});

test('test update', t => {
  const result = fruits.update({name: 'name', stock: 'stock', id: 1});
  t.equal(result instanceof Promise, true, 'should return a promise');
  t.end();
});

test('test remove', t => {
  const result = fruits.remove('id');
  t.equal(result instanceof Promise, true, 'should return a promise');
  t.end();
});
