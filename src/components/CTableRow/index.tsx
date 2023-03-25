import React, {useState} from 'react';

import CCheckbox from 'components/CCheckbox';
import {getCellData} from 'utils/helpers/getCellData';
import CellPopover from 'components/CellPopover/CellPopover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {TableCell, TableRow, TableRowProps} from '@mui/material';

interface Props extends TableRowProps {
  isSelected: boolean;
  row: any;
  index: number;
  handleClick: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

const CTableRow = (props: Props) => {
  const {row, isSelected, index, handleClick} = props;
  const {id, ...dataRow} = row;
  const displayData = {order: index + 1, ...dataRow};

  const [anchorPopoverEl, setAnchorPopoverEl] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >();

  const closePopover = () => {
    setAnchorPopoverEl(null);
  };

  const handleClickActionRow = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    setAnchorPopoverEl(e.currentTarget);
  };

  return (
    <TableRow hover role='checkbox' aria-checked={isSelected} tabIndex={-1} selected={isSelected}>
      <TableCell padding='checkbox'>
        <CCheckbox color='primary' checked={isSelected} onChange={(event) => handleClick(event, id)} />
      </TableCell>
      {Object.keys(displayData).map((key, idx) => {
        const dataLength = Object.keys(displayData).length;

        return idx < dataLength - 1 ? (
          <TableCell key={`cell-${idx}`} align={'left'}>
            <span className={key === 'status' ? `cell-variant cell-variant__${displayData[key]}` : ''}>
              {getCellData(displayData[key])}
            </span>
          </TableCell>
        ) : (
          <TableCell key={`cell-${idx}`} align={'center'}>
            <div className='d-flex align-items-center justify-content-center' key={id}>
              <MoreVertIcon onClick={handleClickActionRow} />
              <CellPopover
                setAnchorPopoverEl={setAnchorPopoverEl}
                tableRowActions={displayData[key]}
                targetId={id}
                open={!!anchorPopoverEl}
                anchorEl={anchorPopoverEl}
                onClose={closePopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              />
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default CTableRow;
