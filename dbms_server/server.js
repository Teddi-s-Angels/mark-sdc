const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.static('../client/dist'));

app.use(express.json());

app.get('/reviews/:product_id/list', (req, res) => {
  insertQueryNameHere((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error in GET request');
    } else {
      console.log('GET success!');
      res.status(200).send(data);
    }
  })
});

app.get('/reviews/:product_id/meta', (req, res) => {
  insertQueryNameHere((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error in GET request');
    } else {
      console.log('GET success!');
      res.status(200).send(data);
    }
  })
});

app.post('/reviews/:product_id', (req, res) => {
  insertQueryNameHere(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error in POST request');
    } else {
      console.log('POST success!');
      res.sendStatus(201);
    }
  })
});

app.put('PUT /reviews/helpful/:review_id', (req, res) => {
  insertQueryNameHere(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error in PUT request');
    } else {
      console.log('PUT success!');
      res.sendStatus(204);
    }
  })
});

app.put('PUT /reviews/report/:review_id', (req, res) => {
  insertQueryNameHere(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error in PUT request');
    } else {
      console.log('PUT success!');
      res.sendStatus(204);
    }
  })
})

app.listen(PORT, () => {
    console.log('Serving up now at '+ JSON.stringify(PORT))
});