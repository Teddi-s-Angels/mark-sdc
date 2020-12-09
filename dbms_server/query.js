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

const getReviews = async function(productID, cb) {
  let queryStr = `SELECT * FROM productReviews WHERE product = ${productID} LIMIT 10`;
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
  let queryStr = '';
  connection.query(queryStr, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  })
};

const insertReviewPhotos = function(reviewPhotos, cb) {
  let queryStr = '';
  connection.query(queryStr, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  })
};

module.exports = {
  getReviews,
  getReviewsPhotos,
  getMeta,
  insertReview,
  insertReviewPhotos
}