require('newrelic');
const express = require('express');
const app = express();
const queryFunctions = require('./query.js');
const PORT = 3001;

app.use(express.static('../client/dist'));

app.use(express.json());

app.get('/reviews/:product_id/list', (req, res) => {
  queryFunctions.getReviews(req.params.product_id, req.query.count, req.query.sort, (err, data) => {
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
        page: `1`,
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
  console.log(req.body)
  let reqPhotosArray = req.body.photos.slice(1, req.body.photos.length - 1);
  reqPhotosArray = reqPhotosArray.split(',');
  let photoObjectsArray = [];
  for (let i = 0; i < reqPhotosArray.length; i++) {
    photoObjectsArray.push({id: i, url: reqPhotosArray[i]});
  }
  console.log(photoObjectsArray);
  photoObjectsArray = JSON.stringify(photoObjectsArray);
  let postObj = {
    product: req.params.product_id,
    rating: req.body.rating,
    summary: JSON.stringify(req.body.summary),
    recommend: req.body.recommend,
    response: JSON.stringify(""),
    body: JSON.stringify(req.body.body),
    date: JSON.stringify('2020-12-10T00:00:00.000Z'),
    reviewer_name: JSON.stringify(req.body.name),
    helpfulness: 0,
    photos: JSON.stringify(photoObjectsArray.split(',').join('-'))
  }
  // const body = {
  //   rating: this.state.stars,
  //   summary: this.state.summary,
  //   body: this.state.body,
  //   recommend: this.state.doRecommend,
  //   name: this.state.nickname,
  //   email: this.state.email,
  //   photos: this.state.photos,
  //   characteristics: characteristicsObj
  // };
  console.log(postObj);
  console.log(JSON.parse(postObj.photos.split('-').join(',')));
  // INSERT INTO productReviews(product, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos) VALUES(142, 1, undefined, 1, , testy body, 2020-12-10T00:00:00.000Z, tester tester, 0, [{"id":0-"url":"'http://placeimg.com/640/480/fashion'"}-{"id":1-"url":"'http://placeimg.com/640/481/fashion'"}-{"id":2-"url":"'http://placeimg.com/640/482/fashion'"}])

  // let queryStr = `INSERT INTO productReviews(review_id, product, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos) VALUES(${review.review_id}, ${review.product}, ${review.rating}, ${review.summary}, ${review.recommend}, ${review.response}, ${review.body}, ${review.date}, ${review.reviewer_name}, ${review.helpfulness}, ${review.photos})`;
  queryFunctions.insertReview(postObj, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error in POST request');
    } else {
      console.log('POST success!');
      res.sendStatus(201);
    }
  })
});

//json body for testing
// {
//   "rating": "1",
//   "summary": "testy test",
//   "body": "testy test",
//   "recommend": "1",
//   "name": "tester tester",
//   "email": "testytest@tester.com",
//   "photos": "['http://placeimg.com/640/480/fashion','http://placeimg.com/640/481/fashion','http://placeimg.com/640/482/fashion']",
//   "characteristics": "{}"
// }

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