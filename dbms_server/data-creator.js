const fs = require('fs');
const faker = require('faker');

//xxxxx create writeFile method, then check with fake data
//xxxxx attempt to create fake data with faker
//create readFileStream and insert to DB, then check with created file

let totalFakeReviewsString = '';
let totalFakeReviewsPhotosString = '';
let numOfReviews = 100000;
let maxReviewPhotosPerReview = 3;
let numOfProducts = 5;

for (let i = 1; i < numOfReviews; i++) {
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

  let eachFakeReviewsString = review_id + ',' + product + ',' + rating + ',' + summary + ',' + recommend + ',' + response + ',' + body + ',' + date + ',' + reviewer_name + ',' + helpfulness + ',';
  totalFakeReviewsString += eachFakeReviewsString;

  for (let j = 0; j < Math.ceil(Math.random() * maxReviewPhotosPerReview); j++) {
    let id = j;
    let url = faker.image.fashion();

    let eachFakeReviewsPhotosString = id + ',' + url + ',' + review_id + ','
    totalFakeReviewsPhotosString += eachFakeReviewsPhotosString;
  }
}

fs.writeFile('./fakeReviews.txt', totalFakeReviewsString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('write reviews file success!');
  }
});

fs.writeFile('./fakeReviewsPhotos.txt', totalFakeReviewsPhotosString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('write reviews photos file success!');
  }
});
