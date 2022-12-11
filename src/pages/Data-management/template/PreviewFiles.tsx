import {CsvFile, TxtFile} from 'assets';
import React from 'react';
import {calcFileSize} from 'utils/helpers/calcFileSize';
import validFileType from 'utils/helpers/validDataType';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  file: File;
  onRemoveFile: (filename: string) => void;
  isUploaded?: boolean;
  uploadingProgress?: number;
}

const PreviewFiles = (props: Props) => {
  const {file, onRemoveFile, isUploaded = false, uploadingProgress = 0} = props;
  const {name, size, type} = file;

  return (
    <>
      {validFileType(type) ? (
        <div className={`preview-list__file ${isUploaded ? 'file-uploaded' : ''}`}>
          <div className='file-info'>
            <div className='file-img'>
              <img src={type === 'text/plain' ? TxtFile : CsvFile} alt={name} />
            </div>
            <div className='d-flex flex-column gap-2'>
              <div className='file-name'>{name}</div>
              <div className='file-size'>{calcFileSize(size)}</div>
            </div>
          </div>
          <div
            className={`file-control ${isUploaded ? 'file-control__uploaded' : ''}`}
            onClick={() => onRemoveFile(name)}
          >
            {isUploaded ? <CheckIcon /> : <DeleteIcon />}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PreviewFiles;
