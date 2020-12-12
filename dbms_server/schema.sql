\c template1;
DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
\c reviews;

DROP TABLE IF EXISTS productReviewsPhotos;
DROP TABLE IF EXISTS productReviews;

CREATE TABLE IF NOT EXISTS productReviews
( review_id SERIAL,
  product integer NOT NULL,
  rating integer,
  summary text,
  recommend integer,
  response text,
  body text,
  date text,
  reviewer_name text,
  helpfulness integer,
  photos text,
  PRIMARY KEY (review_id)
);


-- CREATE TABLE IF NOT EXISTS productReviewsPhotos
-- ( picture_ID SERIAL,
--   id INTEGER NOT NULL,
--   url TEXT,
--   review_id INTEGER,
--   PRIMARY KEY (picture_ID)
-- );

CREATE TABLE IF NOT EXISTS metaReviews
( product_id INTEGER NOT NULL,
  ratings TEXT,
  recommended TEXT,
  characteristics TEXT,
  PRIMARY KEY (product_id)
);

-- COPY productReviews(review_id, product, rating, summary, recommend, response, body, date, reviewer_name, helpfulness)
-- FROM PROGRAM 'awk C:\Users\Mark\Documents\GitHub\nate-fec\dbms_server\tmp\fakeReviews*.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY productReviewsPhotos(id, url, review_id)
-- FROM PROGRAM 'C:\Users\Mark\Documents\GitHub\nate-fec\dbms_server\tmp\fakeReviewsPhotos*.csv'
-- DELIMITER ','
-- CSV HEADER;

--This FOR loop adds all the fakeReviews*.csv to the productReviews table.
DO $$

DECLARE file_path TEXT; -- Path where your CSV files are
DECLARE fn_i TEXT; -- Variable to hold name of current CSV file being inserted
DECLARE mytable TEXT; -- Variable to hold name of table to insert data into

BEGIN

    file_path := 'C:\Users\Mark\Documents\GitHub\nate-fec\dbms_server\tmp\fakeReviews\'; -- Declare the path to your CSV files. You probably need to put this in your PostgreSQL file path to avoid permission issues.
    mytable := 'productReviews(product, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos)'; -- Declare table to insert data into. You can give columns too since it's just going into an execute statement.

    CREATE TEMP TABLE files AS
    SELECT file_path || pg_ls_dir AS fn -- get all of the files in the directory, prepending with file path
    FROM pg_ls_dir(file_path);

    LOOP
        fn_i := (select fn from files limit 1); -- Pick the first file
        raise notice 'fn: %', fn_i;
        EXECUTE 'COPY ' || mytable || ' from ''' || fn_i || ''' with csv header';
        DELETE FROM files WHERE fn = fn_i; -- Delete the file just inserted from the queue
        EXIT  WHEN (SELECT COUNT(*) FROM files) = 0;
     END LOOP;

END $$;

--This FOR loop adds all the fakeReviewsPhotos*.csv to the productReviewsPhotos table.
-- DO $$

-- DECLARE file_path TEXT; -- Path where your CSV files are
-- DECLARE fn_i TEXT; -- Variable to hold name of current CSV file being inserted
-- DECLARE mytable TEXT; -- Variable to hold name of table to insert data into

-- BEGIN

--     file_path := 'C:\Users\Mark\Documents\GitHub\nate-fec\dbms_server\tmp\fakeReviewsPhotos\'; -- Declare the path to your CSV files. You probably need to put this in your PostgreSQL file path to avoid permission issues.
--     mytable := 'productReviewsPhotos(id, url, review_id)'; -- Declare table to insert data into. You can give columns too since it's just going into an execute statement.

--     CREATE TEMP TABLE files1 AS
--     SELECT file_path || pg_ls_dir AS fn -- get all of the files in the directory, prepending with file path
--     FROM pg_ls_dir(file_path);

--     LOOP
--         fn_i := (select fn from files1 limit 1); -- Pick the first file
--         raise notice 'fn: %', fn_i;
--         EXECUTE 'COPY ' || mytable || ' from ''' || fn_i || ''' with csv header';
--         DELETE FROM files1 WHERE fn = fn_i; -- Delete the file just inserted from the queue
--         EXIT  WHEN (SELECT COUNT(*) FROM files1) = 0;
--      END LOOP;

-- END $$;

CREATE INDEX idx_product_id ON productReviews(product);
CREATE INDEX idx_date ON productReviews(date);
CREATE INDEX idx_helpfulness ON productReviews(helpfulness);

