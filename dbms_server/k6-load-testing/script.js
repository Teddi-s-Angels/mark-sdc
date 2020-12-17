import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100,
  duration: '1m',
  rps: 1,
  thresholds: {
    'failed requests': ['rate<0.1'],
    http_req_duration: ['p(99)<2000'],
  }
}

export default function () {
  let product_id = Math.floor(Math.random() * 100001);
  http.get(`http://localhost:3001/reviews/${product_id}/list?sort=newest`, {timeout:1800000});
  sleep(1);
}

//type the following into cmd.exe to run load test:
//k6 run C:\Users\Mark\Documents\GitHub\nate-fec\dbms_server\k6-load-testing\script.js