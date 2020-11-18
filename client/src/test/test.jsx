import React from 'react';
import renderer from 'react-test-renderer'
//import {cleanup, fireEvent, render} from '@testing-library/react';
import SingleReview from '../components/SingleReview.jsx'

test('component renders single review', () => {
  const product = {
    reviewId: 5,
    body: `I've had this monitor for about 2 months (purchased on Cyber Monday) and I'm still as in love with it as I was on day 1. I primarily use it for video editing with Adobe Premiere and other Adobe software. Although I often edit 4K content I have no problem with this monitor not actually being 4K.`, 
    date: '2020-05-21', 
    helpfulness: null,
    photos: null,
    rating: 4,
    recommend: null,
    response: null,
    reviewerName: 'Michael Scott',
    summary: 'AMAZING VALUE - Fantastic picture, perfect viewing angles!'
  };
  const component = renderer.create(<SingleReview review={product} />);

  let newReview = component.toJSON();
  expect(newReview).toMatchSnapshot();
  
});