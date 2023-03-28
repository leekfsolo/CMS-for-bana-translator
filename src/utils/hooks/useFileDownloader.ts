import {useState} from 'react';
import {v4 as uuid} from 'uuid';

export interface FilesDownload {
  file: string;
  downloadId: string;
}

const useFileDownloader = () => {
  const [files, setFiles] = useState<FilesDownload[]>([]);

  const download = (file: {file: string}) => setFiles((fileList) => [...fileList, {...file, downloadId: uuid()}]);

  const remove = (removeId: string) => setFiles((files) => [...files.filter((file) => file.downloadId !== removeId)]);

  return {download, remove, files};
};

export default useFileDownloader;
