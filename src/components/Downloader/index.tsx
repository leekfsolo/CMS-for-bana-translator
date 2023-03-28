import DownloadItem from 'components/DownloadItem';
import React from 'react';
import {FilesDownload} from 'utils/hooks/useFileDownloader';

interface Props {
  remove: (removeId: string) => void;
  files: FilesDownload[];
  formatFile: string;
}

const Downloader = (props: Props) => {
  const {files, remove, formatFile} = props;

  return (
    <div className='downloader'>
      <div className='card'>
        <div className='card-header'>File Downloader</div>
        <ul className='list-group list-group-flush'>
          {files.map((file, idx) => (
            <DownloadItem key={idx} removeFile={() => remove(file.downloadId)} {...file} formatFile={formatFile} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Downloader;
