let request = require('supertest');
let express = require('express');
let router = require('../routes/index');

let app = new express();
app.use('/', router);

describe('Good itens Routes', function () {

  it("/itens", async () => {
        await request(app)
          .get("/itens")
          .expect(200); 
      
});
});