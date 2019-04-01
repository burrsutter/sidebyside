'use strict';

const test = require('tape');
const supertest = require('supertest');
const proxyquire = require('proxyquire');

const mockDb = {
  init: () => {
    return Promise.resolve();
  }
};

test('test GET all fruits', t => {
  const mockApi = {
    findAll: () => Promise.resolve({rows: [{id: 1}]})
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .get('/api/fruits')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      t.equal(Array.isArray(response.body), true, 'should return an array');
      t.equal(response.body.length, 1, 'should have a body length of 1');
      t.end();
    });
});

test('test GET all fruits - error', t => {
  const mockApi = {
    findAll: () => Promise.reject(new Error('error'))
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .get('/api/fruits')
    .expect(400)
    .then(() => {
      t.end();
    });
});

test('test GET fruit', t => {
  const mockApi = {
    find: id => {
      t.equal(id, '1', 'id should be 1 from the request params');
      return Promise.resolve({rows: [{id}]});
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .get('/api/fruits/1')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      t.equal(Array.isArray(response.body), false, 'should not return an array');
      t.equal(response.body.id, '1', 'should have an id of 1');
      t.end();
    });
});

test('test GET fruit - return 404', t => {
  const mockApi = {
    find: () => Promise.resolve({rowCount: 0})
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .get('/api/fruits/1')
    .expect(404)
    .then(response => {
      t.equal(response.text, 'Item 1 not found', 'shhould have a message about not found id');
      t.end();
    });
});

test('test GET fruit - error', t => {
  const mockApi = {
    find: () => Promise.reject(new Error('error'))
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .get('/api/fruits/1')
    .expect(400)
    .then(() => {
      t.end();
    });
});

test('test POST fruit', t => {
  const fruitData = {
    name: 'Banana',
    stock: 10
  };

  const mockApi = {
    create: (name, stock) => {
      t.equal(name, fruitData.name, `respone.body.name should be ${fruitData.name}`);
      t.equal(stock, fruitData.stock, `respone.body.stock should be ${fruitData.stock}`);
      return Promise.resolve({rows: []});
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .post('/api/fruits')
    .send(fruitData)
    .expect(201)
    .then(() => {
      t.end();
    });
});

test('test POST fruit - error - no name', t => {
  const fruitData = {
    stock: 10
  };

  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .post('/api/fruits')
    .send(fruitData)
    .expect(422)
    .then(response => {
      t.equal(response.text, 'The name is required!', 'has a need name message');
      t.end();
    });
});

test('test POST fruit - error - no stock', t => {
  const fruitData = {
    name: 'Banana'
  };

  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .post('/api/fruits')
    .send(fruitData)
    .expect(422)
    .then(response => {
      t.equal(response.text, 'The stock must be greater or equal to 0!', 'has a need stock message');
      t.end();
    });
});

test('test POST fruit - error - id error', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .post('/api/fruits')
    .send({name: 'Banana', stock: 10, id: 22})
    .expect(422)
    .then(response => {
      t.equal(response.text, 'Id was invalidly set on request.', 'has an id error message');
      t.end();
    });
});

test('test POST fruit - error', t => {
  const fruitData = {
    name: 'Banana',
    stock: 10
  };

  const mockApi = {
    create: () => {
      return Promise.reject(new Error('error'));
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .post('/api/fruits')
    .send(fruitData)
    .expect(400)
    .then(() => {
      t.end();
    });
});

test('test POST fruit - error - no payload', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .post('/api/fruits')
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be set');
      t.end();
    });
});

test('test POST fruit - error - invalid payload', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .post('/api/fruits')
    .set('Content-Type', 'application/json')
    .send('Some text')
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be in JSON format');
      t.end();
    });
});

test('test POST fruit - error - xml payload', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });
  const xmlFruitData = '<?xml version="1.0" encoding="UTF-8"?><fruit><name>Banana</name><stock>10</stock></fruit>';
  supertest(app)
    .post('/api/fruits')
    .set('Content-Type', 'application/xml')
    .send(xmlFruitData)
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be in JSON format');
      t.end();
    });
});

test('test POST fruit - error - JSON Content-Type and XML body', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });
  const xmlFruitData = '<?xml version="1.0" encoding="UTF-8"?><fruit><name>adam</name><stock>10</stock></fruit>';
  supertest(app)
    .post('/api/fruits')
    .set('Content-Type', 'application/json')
    .send(xmlFruitData)
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be in JSON format');
      t.end();
    });
});

test('test POST fruit - error - negative number of stock', t => {
  const fruitData = {
    name: 'Banana',
    stock: -10
  };

  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .post('/api/fruits')
    .send(fruitData)
    .expect(422)
    .then(response => {
      t.equal(response.text, 'The stock must be greater or equal to 0!', 'has a need stock message');
      t.end();
    });
});

test('test POST fruit - error - no numeric stock', t => {
  const fruitData = {
    name: 'Banana',
    stock: 'two'
  };

  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .post('/api/fruits')
    .send(fruitData)
    .expect(422)
    .then(response => {
      t.equal(response.text, 'The stock must be greater or equal to 0!', 'has a need stock message');
      t.end();
    });
});

test('test PUT fruit', t => {
  const fruitData = {
    name: 'Banana',
    stock: 10,
    id: '20'
  };

  const mockApi = {
    update: options => {
      t.equal(options.name, fruitData.name, `respone.body.name should be ${fruitData.name}`);
      t.equal(options.stock, fruitData.stock, `respone.body.stock should be ${fruitData.stock}`);
      t.equal(options.id, fruitData.id, `respone.body.id should be ${fruitData.stock}`);
      return Promise.resolve({rowCount: 1});
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .put('/api/fruits/20')
    .send(fruitData)
    .expect(204)
    .then(() => {
      t.end();
    });
});

test('test PUT fruit - error - no name', t => {
  const fruitData = {
    stock: 10
  };

  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .put('/api/fruits/20')
    .expect(422)
    .send(fruitData)
    .then(response => {
      t.equal(response.text, 'The name is required!', 'has a need name message');
      t.end();
    });
});

test('test PUT fruit - error - no stock', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .put('/api/fruits/20')
    .send({name: 'name'})
    .expect(422)
    .then(response => {
      t.equal(response.text, 'The stock must be greater or equal to 0!', 'has a need stock message');
      t.end();
    });
});

test('test PUT fruit - error - id error', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .put('/api/fruits/20')
    .send({name: 'Banana', stock: 10, id: '22'})
    .expect(422)
    .then(response => {
      t.equal(response.text, 'Id was invalidly set on request.', 'id error message');
      t.end();
    });
});

test('test PUT fruit - not found', t => {
  const fruitData = {
    name: 'Banana',
    stock: 10,
    id: '20'
  };

  const mockApi = {
    update: () => {
      return Promise.resolve({rowCount: 0});
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .put('/api/fruits/20')
    .send(fruitData)
    .expect(404)
    .then(response => {
      t.equal(response.text, 'Unknown item 20', 'has unknown update error');
      t.end();
    });
});

test('test PUT fruit - error', t => {
  const fruitData = {
    name: 'Banana',
    stock: 10,
    id: '22'
  };

  const mockApi = {
    update: () => {
      return Promise.reject(new Error('error'));
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .put('/api/fruits/22')
    .send(fruitData)
    .expect(400)
    .then(() => {
      t.end();
    });
});

test('test PUT fruit - error - no payload', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .put('/api/fruits/20')
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be set');
      t.end();
    });
});

test('test PUT fruit - error - invalid payload', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .put('/api/fruits/20')
    .set('Content-Type', 'application/json')
    .send('Some text')
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be in JSON format');
      t.end();
    });
});

test('test PUT fruit - error - xml payload', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });
  const xmlFruitData = '<?xml version="1.0" encoding="UTF-8"?><fruit><name>Banana</name><stock>10</stock></fruit>';
  supertest(app)
    .put('/api/fruits/10')
    .set('Content-Type', 'application/xml')
    .send(xmlFruitData)
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be in JSON format');
      t.end();
    });
});

test('test PUT fruit - error - JSON Content-Type and XML body', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });
  const xmlFruitData = '<?xml version="1.0" encoding="UTF-8"?><fruit><name>adam</name><stock>10</stock></fruit>';
  supertest(app)
    .put('/api/fruits/10')
    .set('Content-Type', 'application/json')
    .send(xmlFruitData)
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be in JSON format');
      t.end();
    });
});

test('test PUT fruit - error - no numeric stock', t => {
  const fruitData = {
    name: 'Banana',
    stock: 'two'
  };

  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .put('/api/fruits/10')
    .send(fruitData)
    .expect(422)
    .then(response => {
      t.equal(response.text, 'The stock must be greater or equal to 0!', 'has a need stock message');
      t.end();
    });
});

test('test DELETE fruit', t => {
  const mockApi = {
    remove: id => {
      t.equal(id, '1', 'id should be 1 from the request params');
      return Promise.resolve({rowCount: 1});
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .delete('/api/fruits/1')
    .expect(204)
    .then(() => {
      t.end();
    });
});

test('test DELETE fruit - error - not found', t => {
  const mockApi = {
    remove: () => {
      return Promise.resolve({rowCount: 0});
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .delete('/api/fruits/1')
    .expect(404)
    .then(response => {
      t.equal(response.text, 'Unknown item 1', 'has unkown error text');
      t.end();
    });
});

test('test DELETE fruit - error', t => {
  const mockApi = {
    remove: () => {
      return Promise.reject(new Error('error'));
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/fruits', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/fruits': routesStub
  });

  supertest(app)
    .delete('/api/fruits/1')
    .expect(400)
    .then(() => {
      t.end();
    });
});
