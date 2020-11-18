import React , {useState, useEffect} from 'react';
import { FaStar } from 'react-icons/fa'

const CustomStarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input 
              type='radio'
              id='customRating'
              name='rating'
              value={ratingValue}
              onClick={() => setRating(ratingValue)}     
              //onClick={props.handleClick}        
            />
            <FaStar
              className='customStar'
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={30}
              value={ratingValue}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}

    </div>
  )
}

export default CustomStarRating