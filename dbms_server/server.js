const express = require('express');
const app = express();
const queryFunctions = require('./query.js');
const PORT = 3001;

app.use(express.static('../client/dist'));

app.use(express.json());

app.get('/reviews/:product_id/list', (req, res) => {
  queryFunctions.getReviews(req.params.product_id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error in GET request');
    } else {
      console.log('GET success!');
      data.rows.forEach(row => {
        row.photos = row.photos.split('-').join(',');
      });
      let resObj = {
        product: `${req.params.product_id}`,
        page: `0`,
        count: `${data.rows.length}`,
        results: data.rows
      }
      res.status(200).send(resObj);
      // for (let i = 0; i < data.rows.length; i++) {
      //   queryFunctions.getReviewsPhotos(data.rows[i].review_id, (err, picData) => {
      //     if (err) {
      //       console.log(err);
      //       res.status(500).send('Error in GET photos request');
      //     } else {
      //       if (picData.rows) {
      //         data.rows[i].photos = picData.rows;
      //       } else {
      //         data.rows[i].photos = [];
      //       }
      //       if (i === (data.rows.length - 1)) {
      //         res.status(200).send(resObj);
      //       }
      //     }
      //   })
      // }
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