\c template1;
DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
\c reviews;

CREATE TABLE IF NOT EXISTS productReviews
( review_id integer NOT NULL,
  product integer NOT NULL,
  rating integer,
  summary text,
  recommend integer,
  response text,
  body text,
  date text,
  reviewer_name text,
  helpfulness integer,
  PRIMARY KEY (review_id)
);

CREATE TABLE IF NOT EXISTS productReviewsPhotos
( picture_ID SERIAL,
  id INTEGER NOT NULL,
  url TEXT,
  review_id INTEGER,
  FOREIGN KEY (review_id) REFERENCES productReviews(review_id),
  PRIMARY KEY (picture_ID)
);

CREATE TABLE IF NOT EXISTS metaReviews
( product_id INTEGER NOT NULL,
  ratings TEXT,
  recommended TEXT,
  characteristics TEXT,
  PRIMARY KEY (product_id)
);

COPY productReviews(review_id, product, rating, summary, recommend, response, body, date, reviewer_name, helpfulness)
FROM 'C:\Users\Mark\Documents\GitHub\nate-fec\dbms_server\fakeReviews.csv'
DELIMITER ','
CSV HEADER;

COPY productReviewsPhotos(id, url, review_id)
FROM 'C:\Users\Mark\Documents\GitHub\nate-fec\dbms_server\fakeReviewsPhotos.csv'
DELIMITER ','
CSV HEADER;