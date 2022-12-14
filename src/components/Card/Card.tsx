import * as React from 'react';
import { QuotesDefinition, HEART_EYES_EMOJI, EXPRESSIONLESS_EMOJI } from '../../types'
import './card.css'
const Card: React.FC<QuotesDefinition> = ({
  id,
  quote,
  author,
  isFavorite,
  setFavorite
}) => {
  return (
    <div className='card'>
      <div className='title'>
        <p>{author}</p>
        <p>{id}</p>
      </div>
      <div className='description'>
        {quote}
      </div>
      <div className='emoji-btn' data-testid='emoji-btn' onClick={() => { setFavorite(id) }}>
        {isFavorite ? HEART_EYES_EMOJI : EXPRESSIONLESS_EMOJI}
      </div>
    </div>
  )
};
export default Card;
