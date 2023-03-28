import {AxiosResponse} from 'axios';

interface DownloadFileProps {
  readonly apiDefinition: () => Promise<AxiosResponse<any>>;
  readonly preDownloading: () => void;
  readonly postDownloading: () => void;
  readonly onError: () => void;
}

interface DownloadedFileInfo {
  readonly download: () => Promise<void>;
}

export const handleDownloadFile = ({
  apiDefinition,
  preDownloading,
  postDownloading,
  onError
}: DownloadFileProps): DownloadedFileInfo => {
  const download = async () => {
    try {
      preDownloading();
      const data: any = await apiDefinition();
      const url = URL.createObjectURL(new Blob([data]));
      const filename = url.split('/').pop() || 'default';
      const aTag = document.createElement('a');
      aTag.href = url;
      aTag.setAttribute('download', filename);
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();

      postDownloading();
      URL.revokeObjectURL(url);
    } catch (error) {
      onError();
    }
  };

  return {download};
};
