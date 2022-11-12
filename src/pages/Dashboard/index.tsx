import React from 'react';
import CBasicCard from 'components/CBasicCard';
import {CardVariant} from 'components/enum';
import {IBasicCard} from 'components/interface';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

const Dashboard = () => {
  const basicCardData: IBasicCard[] = [
    {
      title: 'Title',
      content: '100',
      variant: CardVariant.DARK,
      icon: <DocumentScannerIcon />,
      description: 'Description',
      prevIndex: 20
    },
    {
      title: 'Title',
      content: '100',
      variant: CardVariant.BLUE,
      icon: <DocumentScannerIcon />,
      description: 'Description',
      prevIndex: 50
    },
    {
      title: 'Title',
      content: '100',
      variant: CardVariant.GREEN,
      icon: <DocumentScannerIcon />,
      description: 'Description',
      prevIndex: -20
    },
    {
      title: 'Title',
      content: '100',
      variant: CardVariant.PINK,
      icon: <DocumentScannerIcon />,
      description: 'Description'
    }
  ];
  return (
    <div className='dashboard'>
      <div className='container'>
        <div className='row'>
          {basicCardData.map((card) => (
            <div className='col-3'>
              <CBasicCard data={card} key={card.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
