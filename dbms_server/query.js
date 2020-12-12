const { Client } = require('pg');

const connection = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'hackreactormarkdub91',
  database: 'reviews',
  port: 5432
})

connection.connect();

//GET / POST request queries
//GET
  //reviews, reviewsPhotos, meta
//POST
  //reviews, reviewsPhotos

const getReviews = async function(productID, count = 5, sortType = 'helpfulness', cb) {
  if (sortType === 'newest') {
    sortType = ' ORDER BY date';
  } else if (sortType === 'helpful' || sortType === 'helpfulness') {
    sortType = ' ORDER BY helpfulness';
  } else if (sortType === 'relevant') {
    sortType = 'AND helpfulness >= 24 ORDER BY date';
  }
  let queryStr = `SELECT * FROM productReviews WHERE product = ${productID}${sortType} DESC LIMIT ${count}`;
  connection.query(queryStr, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  })
};

const getReviewsPhotos = async function(review_id, cb) {
  let queryStr = `SELECT * FROM productReviewsPhotos WHERE review_id = ${review_id}`;
  // let queryStr = `SELECT picture_ID, id, url FROM productReviews INNER JOIN productReviewsPhotos ON productReviewsPhotos.review_id = productReviews.review_id WHERE productReviewsPhotos.review_id = ${review_id}`;
  // let queryStr = `SELECT url FROM productReviews INNER JOIN productReviewsPhotos ON productReviewsPhotos.review_id = productReviews.review_id WHERE productReviewsPhotos.review_id = ${review_id}`;
  connection.query(queryStr, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  })
};

const getMeta = function(id, cb) {
  let queryStr = '';
  connection.query(queryStr, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  })
};

const insertReview = function(review, cb) {
  let queryStr = `INSERT INTO productReviews(product, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos) VALUES(${review.product}, ${review.rating}, ${review.summary}, ${review.recommend}, ${review.response}, ${review.body}, ${review.date}, ${review.reviewer_name}, ${review.helpfulness}, ${review.photos})`;
  console.log(queryStr);
  connection.query(queryStr, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  })
};

"  INSERT INTO productReviews(product, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos) VALUES(142, 1, 'test summary', 1, '', 'test body', '2020-12-10T00:00:00.000Z', 'tester name', 0, '[]');  "

module.exports = {
  getReviews,
  getReviewsPhotos,
  getMeta,
  insertReview
}