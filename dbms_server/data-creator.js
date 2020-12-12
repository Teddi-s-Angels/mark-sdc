console.time('data creation time');
const fs = require('fs');
const faker = require('faker');

//fake data file location:
//C:\Users\Mark\Documents\GitHub\nate-fec\dbms_server\tmp\fakeReviews\fakeReviews*.csv
//C:\Users\Mark\Documents\GitHub\nate-fec\dbms_server\tmp\fakeReviewsPhotos\fakeReviews*.csv

let writeBlock = 0;
let numOfReviews = 1000000;
let maxReviewPhotosPerReview = 5;
let numOfProducts = 100000;

while (writeBlock <= 9) {
  writeBlock++;

  let totalFakeReviewsString = 'product,rating,summary,recommend,response,body,date,reviewer_name,helpfulness,photos\n';
  let totalFakeReviewsPhotosString = 'id,url,review_id\n';

  for (let i = (1 + (writeBlock - 1) * numOfReviews); i <= (writeBlock * numOfReviews); i++) {
    let review_id = i;
    let product = Math.ceil(Math.random() * numOfProducts);
    let rating = Math.floor(Math.random() * 6);
    let summary = faker.lorem.paragraph();
    let recommend = Math.floor(Math.random() * 2);
    let response = '';
    let body = faker.lorem.sentence();
    let randMonth = JSON.stringify(Math.floor(Math.random() * 13));
    if (randMonth.length === 1) {
      randMonth = '0' + randMonth;
    }
    let randDay = JSON.stringify(Math.floor(Math.random() * 29));
    if (randDay.length === 1) {
      randDay = '0' + randDay;
    }
    let date = '2019-' + randMonth + '-' + randDay + 'T00:00:00.000Z';
    let reviewer_name = faker.name.findName();
    let helpfulness = Math.floor(Math.random() * 101);
    let photos = [];

    for (let j = 0; j < Math.floor(Math.random() * (maxReviewPhotosPerReview + 1)); j++) {
      let pic = {'id': j, 'url': faker.image.fashion()};
      photos.push(pic);

      // let id = j;
      // let url = faker.image.fashion();

      // let eachFakeReviewsPhotosString = id + ',' + url + ',' + review_id + '\n';
      // totalFakeReviewsPhotosString += eachFakeReviewsPhotosString;
    }
    if (photos !== []) {
      photos = JSON.stringify(photos);
      photos = photos.split(',');
      photos = photos.join('-');
    } else {
      photos = JSON.stringify(photos);
    }
    //creates review string
    let eachFakeReviewsString = product + ',' + rating + ',' + summary + ',' + recommend + ',' + response + ',' + body + ',' + date + ',' + reviewer_name + ',' + helpfulness + ',' + photos + '\n';
    totalFakeReviewsString += eachFakeReviewsString;
  }
  // writeToFile(totalFakeReviewsString, totalFakeReviewsPhotosString, writeBlock);
  fs.writeFileSync(`./tmp/fakeReviews/fakeReviews${writeBlock}.csv`, totalFakeReviewsString, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`write reviews file ${writeBlock} success!`);
      if (block === 9) {
        console.timeEnd('data creation time');
      }
    }
  });
}

//   fs.writeFileSync(`./tmp/fakeReviewsPhotos/fakeReviewsPhotos${writeBlock}.csv`, totalFakeReviewsPhotosString, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(`write reviews photos file ${writeBlock} success!`);
//     }
//   });
// };

console.timeEnd('data creation time');