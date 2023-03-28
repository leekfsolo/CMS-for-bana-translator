import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import axiosClient from 'api/axiosClient';
import React, {useState, useEffect} from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type DownloadInfoType = {
  progress: number;
  completed: boolean;
  total: number;
  loaded: number;
};

interface Props {
  file: string;
  removeFile: () => void;
  formatFile: string;
}

const DownloadItem = (props: Props) => {
  const {file, removeFile, formatFile} = props;

  const [downloadInfo, setDownloadInfo] = useState<DownloadInfoType>({
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0
  });

  useEffect(() => {
    const options = {
      onDownloadProgress: (progressEvent: ProgressEvent) => {
        const {loaded, total} = progressEvent;

        setDownloadInfo({
          progress: Math.floor((loaded * 100) / total),
          loaded,
          total,
          completed: false
        });
      }
    };

    axiosClient
      .get(file, {
        responseType: 'blob',
        ...options
      })
      .then(function (response: any) {
        const url = URL.createObjectURL(new Blob([response]));

        const link = document.createElement('a');
        const filename = url.split('/').pop() || 'default';

        link.href = url;
        link.setAttribute('download', filename + formatFile);
        document.body.appendChild(link);
        link.click();
        link.remove();

        setDownloadInfo((info) => ({
          ...info,
          completed: true
        }));

        setTimeout(() => {
          removeFile();
        }, 2000);
      });
  }, []);

  const formatBytes = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <li className='list-group-item'>
      <div className='row'>
        <div className='col-12 d-flex'>
          {!downloadInfo.completed ? (
            <div className='d-inline ml-2'>
              <small>
                {downloadInfo.loaded > 0 && (
                  <>
                    <span className='text-success'>{formatBytes(downloadInfo.loaded)}</span>/{' '}
                    {formatBytes(downloadInfo.total)}
                  </>
                )}

                {downloadInfo.loaded === 0 && <>Đang khởi tạo file...</>}
              </small>
            </div>
          ) : (
            <div className='d-flex align-items-center gap-1'>
              <span className='text-success'>Thành công</span>
              <CheckCircleOutlineIcon className='text-success' sx={{fontSize: 16}} />
            </div>
          )}
        </div>
        <div className='col-12 mt-2'>
          <LinearProgress value={downloadInfo.progress} variant='determinate' />
        </div>
      </div>
    </li>
  );
};

export default DownloadItem;
