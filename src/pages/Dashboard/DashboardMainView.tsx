import {Paper} from '@mui/material';
import {CModalProps} from 'components/CModal/CModal';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import CTableToolbar from 'components/CTableToolbar';
import React, {Dispatch, lazy, MutableRefObject, Suspense} from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import CampaignIcon from '@mui/icons-material/Campaign';
import QueueIcon from '@mui/icons-material/Queue';
import {IDashboardData, TableHeadCell} from '../interface';
import ActionBar, {actionBarControlButtonsProps} from 'components/ActionBar/ActionBar';
import {getCellData} from 'utils/helpers/getCellData';
const CModal = lazy(() => import('components/CModal/CModal'));

export interface DashboardMainViewProps {
  modelContent?: CModalProps;
  dashboardData: IDashboardData;
  headCells: TableHeadCell[];
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<React.SetStateAction<number>>;
  cardRef: MutableRefObject<HTMLDivElement | null>;
  selected: string[];
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  isSelected: (name: string) => boolean;
  displayData: any[];
  actionBarControlButtons?: actionBarControlButtonsProps[];
}

const DashboardMainView = (props: DashboardMainViewProps) => {
  const {
    modelContent,
    dashboardData,
    headCells,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    cardRef,
    selected,
    handleSelectAllClick,
    isSelected,
    handleClick,
    displayData,
    actionBarControlButtons
  } = props;
  const {tasksData, totalTasks, currentModels} = dashboardData;

  return (
    <div className='dashboard'>
      <Suspense>{modelContent && <CModal {...modelContent} />}</Suspense>
      <div className='dashboard-overview w-100 d-flex flex-wrap gap-3 justify-content-between mb-3'>
        {currentModels.map((model, idx) => {
          const {model_name, model_type, createdDate, accuracy, ...modelLoss} = model;
          const isTranslate: boolean = model_type === 'NMT';

          return (
            <div className={`dashboard-overview__card card-${isTranslate ? 'translate' : 'speech'}`} key={idx}>
              <div className='card-info d-flex align-items-center justify-content-between mb-3'>
                <div className='d-flex align-items-center'>
                  <p className='m-0 pe-1'>{model_type}</p>
                  <span className='ps-1 card-version'>{model_name}</span>
                </div>
                {true && (
                  <div className='card-sub'>
                    <span>{createdDate}</span>
                  </div>
                )}
              </div>

              <div className='card-icon d-flex align-items-center gap-3'>
                <div className='card-icon__svg'>{isTranslate ? <TranslateIcon /> : <CampaignIcon />}</div>

                <div className='card-extend'>
                  {isTranslate ? (
                    <p className='card-extend__item mb-1'>
                      bleu score: <span>{getCellData(accuracy)}</span>
                    </p>
                  ) : (
                    <div className='d-flex flex-wrap align-items-center'>
                      {Object.entries(modelLoss).map(([key, value]) => (
                        <p className='card-extend__item mb-1' key={key}>
                          {key}: <span>{getCellData(value)}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div className='dashboard-overview__card card-queue'>
          <div className='card-info d-flex align-items-center mb-3 justify-content-between'>
            <p className='m-0 pe-1'>Training Queue</p>
            <div className='card-sub'>
              <span className='current-count'>{totalTasks}</span>
              <span className='max-count'>/{tasksData.length}</span>
            </div>
          </div>

          <div className='card-icon d-flex align-items-center gap-4'>
            <div className='card-icon__svg'>
              <QueueIcon />
            </div>
            <div className='card-progress'>
              <div className='progress-inner' ref={cardRef}></div>
            </div>
          </div>
        </div>
      </div>
      <div className='dashboard-training'>
        <Paper sx={{width: '100%', mb: 2}}>
          <CTableToolbar tableTitle='Lịch sử train' />
          <CTable
            data={displayData}
            headCells={headCells}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={selected}
            handleClick={handleClick}
            handleSelectAllClick={handleSelectAllClick}
            isSelected={isSelected}
          />
          <CPagination
            maxLength={tasksData.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Paper>
        {selected.length > 0 && (
          <ActionBar
            handleSelectAllClick={handleSelectAllClick}
            selectedRows={selected.length}
            rowCount={displayData.length}
            actionBarControlButtons={actionBarControlButtons}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardMainView;
