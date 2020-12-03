-- **Tables**
--   productReviews
      --product integer auto-increment not null start at 1
      --page integer (default to 1)
      --count integer (random number between 6 and 12)
      --results array of objects (length is that of count)
        --review_id (increments up to count from 1)
        --rating (random number 0 to 5)
        --summary (random string of 3 to 15 words)
        --recommend (random either 0 or 1)
        --response (empty string)
        --body (random string of 1 to 5 words)
        --date (2019-random month-random dayT00:00:00.000Z <<should be string)
        --reviewer_name (random word)
        --helpfulness (random integer from 0 to 50)
        --photos (array of random length 0 to 3, random selection from 1000 picture url array)
          --id (auto-increment up to photos.length from 1)
          --url (random selection from 1000 picture url array)

--   metaReviews
      --product_id INTEGER AUTO_INCREMENT NOT NULL    (start at 1)
      --ratings NOT NULL    (object with random value between 0 and 50 for 0-5 key)
      --recommended INTEGER NOT NULL    (object with keys 0 and 1 and random values between 0 and 12)
      --characteristics   (object with the following key-object pairs)
        --Size    (object)
          --id
          --value
        --Width   (object)
          --id
          --value
        --Comfort   (object)
          --id
          --value
DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
USE reviews;

CREATE TABLE IF NOT EXISTS productReviews (
  product INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  page INTEGER,
  count INTEGER,
);

CREATE TABLE IF NOT EXISTS productReviewsResults (
  review_id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  rating INTEGER,
  summary TEXT,
  recommend INTEGER,
  response TEXT,
  body TEXT,
  date TEXT,
  reviewer_name TEXT,
  helpfulness INTEGER,
  product INTEGER,
  CONSTRAINT fk_productReviews
    FOREIGN KEY(product)
      REFERENCES productReviews(product)
)

CREATE TABLE IF NOT EXISTS productReviewsResultsPhotos (
  id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  url TEXT,
  review_id INTEGER,
  CONSTRAINT fk_productReviewsResultsPhotos
    FOREIGN KEY(review_id)
      REFERENCES productReviewsResults(review_id)
)

CREATE TABLE IF NOT EXISTS metaReviews (
  product_id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  ratings TEXT
  recommended TEXT
  characteristics TEXT
)


