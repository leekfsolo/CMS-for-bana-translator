import React from 'react';
import {CardVariant} from 'components/enum';
import {IBasicCard} from 'components/interface';
import {Paper} from '@mui/material';
import classNames from 'classnames';
import CDivider from 'components/CDivider';

type Props = {
  data: IBasicCard;
};

const CBasicCard = (props: Props) => {
  const {variant = CardVariant.DARK, content, description, icon, title, prevIndex = 0} = props.data;

  const cardIndexClassnames = classNames('card-index', {negative: prevIndex < 0});
  const cardVariantClassnames = classNames('card-variant', `card-variant__${variant}`);

  return (
    <Paper sx={{borderRadius: 3}} elevation={2} className='basic-card'>
      <div className='basic-card__info'>
        <Paper elevation={2} className={cardVariantClassnames}>
          {icon}
        </Paper>
        <div className='card-detail'>
          <div className='card-detail__title'>{title}</div>
          <div className='card-detail__content'>{content}</div>
        </div>
      </div>

      <CDivider />

      <div className='basic-card__desc'>
        {prevIndex !== 0 && <div className={cardIndexClassnames}>{prevIndex > 0 ? `+${prevIndex}` : prevIndex}%</div>}
        <div className='card-description'>{description}</div>
      </div>
    </Paper>
  );
};

export default CBasicCard;
