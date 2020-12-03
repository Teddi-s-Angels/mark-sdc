const fs = require('fs');
const faker = require('faker');

//xxxxx create writeFile method, then check with fake data
//xxxxx attempt to create fake data with faker
//create readFileStream and insert to DB, then check with created file

let totalFakeDataString = '';

for (let i = 1; i < 10000; i++) {
  let review_id = i;
  let product = Math.ceil(Math.random() * 3); //random product from 1 to 3
  let rating = Math.floor(Math.random() * 6);
  let summary = faker.lorem.paragraph();
  let recommend = Math.floor(Math.random() * 2);
  let response = '';
  let body = faker.lorem.sentence();
  let date = faker.date.between('2019-01-01', '2019-12-31') + 'T00:00:00.000Z';
  let reviewer_name = faker.name.findName();
  let helpfulness = Math.floor(Math.random() * 26);

  let eachFakeDataString = review_id + ',' + product + ',' + rating + ',' + summary + ',' + recommend + ',' + response + ',' + body + ',' + date + ',' + reviewer_name + ',' + helpfulness + ',';
  totalFakeDataString += eachFakeDataString;
}

fs.writeFile('./fakeData.txt', totalFakeDataString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('write file success!');
  }
});
