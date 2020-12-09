console.time('data creation time');
const fs = require('fs');
const faker = require('faker');

//fake data file location:
//C:\Users\Mark\Documents\GitHub\nate-fec\dbms_server\tmp\fakeReviews\fakeReviews*.csv
//C:\Users\Mark\Documents\GitHub\nate-fec\dbms_server\tmp\fakeReviewsPhotos\fakeReviews*.csv

let writeBlock = 0;
let numOfReviews = 1000000;
let maxReviewPhotosPerReview = 3;
let numOfProducts = 1000;

while (writeBlock <= 9) {
  writeBlock++;

  let totalFakeReviewsString = 'review_id,product,rating,summary,recommend,response,body,date,reviewer_name,helpfulness\n';
  let totalFakeReviewsPhotosString = 'id,url,review_id\n';

  for (let i = (1 + (writeBlock - 1) * numOfReviews); i <= (writeBlock * numOfReviews); i++) {
    let review_id = i;
    let product = Math.ceil(Math.random() * numOfProducts);
    let rating = Math.floor(Math.random() * 6);
    let summary = faker.lorem.paragraph();
    let recommend = Math.floor(Math.random() * 2);
    let response = '';
    let body = faker.lorem.sentence();
    let date = faker.date.between('2019-01-01', '2019-12-31') + 'T00:00:00.000Z';
    let reviewer_name = faker.name.findName();
    let helpfulness = Math.floor(Math.random() * 26);

    //creates review string
    let eachFakeReviewsString = review_id + ',' + product + ',' + rating + ',' + summary + ',' + recommend + ',' + response + ',' + body + ',' + date + ',' + reviewer_name + ',' + helpfulness + '\n';
    totalFakeReviewsString += eachFakeReviewsString;

    //creates review photos string
    for (let j = 0; j < Math.ceil(Math.random() * maxReviewPhotosPerReview); j++) {
      let id = j;
      let url = faker.image.fashion();

      let eachFakeReviewsPhotosString = id + ',' + url + ',' + review_id + '\n';
      totalFakeReviewsPhotosString += eachFakeReviewsPhotosString;
    }
  }
  // writeToFile(totalFakeReviewsString, totalFakeReviewsPhotosString, writeBlock);
  fs.writeFileSync(`./tmp/fakeReviews/fakeReviews${writeBlock}.csv`, totalFakeReviewsString, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`write reviews file ${writeBlock} success!`);
    }
  });

  fs.writeFileSync(`./tmp/fakeReviewsPhotos/fakeReviewsPhotos${writeBlock}.csv`, totalFakeReviewsPhotosString, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`write reviews photos file ${writeBlock} success!`);
      if (block === 9) {
        console.timeEnd('data creation time');
      }
    }
  });
};

console.timeEnd('data creation time');