import React from 'react';
import {ZipFile} from 'assets';
import {calcFileSize} from 'utils/helpers/calcFileSize';
import validFileType from 'utils/helpers/validDataType';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import {LinearProgress} from '@mui/material';

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
          <div className='file-content w-100'>
            <div className='file-img'>
              <img src={ZipFile} alt={name} />
            </div>
            <div className='file-info'>
              <div>
                <div className='file-name'>
                  <p>{name}</p>
                  <div className='file-control'>
                    {isUploaded ? (
                      <CheckIcon className='file-control__check' />
                    ) : (
                      <DeleteIcon onClick={() => onRemoveFile(name)} className='file-control__delete' />
                    )}
                  </div>
                </div>

                <div className='file-size'>{calcFileSize(size)}</div>
              </div>

              <LinearProgress variant='determinate' value={uploadingProgress} />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PreviewFiles;
