const postgresql = require('postgres');

const connection = postgresql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hackreactormarkdub91',
  database: 'reviews'
})

connection.connect();

//GET / POST request queries

module.exports = {
  insertProductReviews,
  insertProductReviewsPhotos,
  insertMetaReviews
}