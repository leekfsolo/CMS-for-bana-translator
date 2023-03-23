import {Popover, PopoverProps} from '@mui/material';
import {IRowAction} from 'components/interface';
import React, {Dispatch, forwardRef} from 'react';

interface Props extends PopoverProps {
  className?: string;
  tableRowActions: IRowAction[];
  setAnchorPopoverEl: Dispatch<React.SetStateAction<Element | ((element: Element) => Element) | null | undefined>>;
  targetId: string;
}

const CellPopover = forwardRef<any, Props>((props: Props, ref) => {
  const {className, targetId, setAnchorPopoverEl, tableRowActions, ...restProps} = props;

  return (
    <Popover ref={ref} PaperProps={{className: `cell-popover ${className}`}} {...restProps}>
      {tableRowActions.map((action) => (
        <div
          className='cell-popover__action'
          key={action.title}
          onClick={() => {
            setAnchorPopoverEl(null);
            action.handle({type: action.actionType, payload: [targetId]});
          }}
        >
          {action.icon}
          <span>{action.title}</span>
        </div>
      ))}
    </Popover>
  );
});

export default CellPopover;
