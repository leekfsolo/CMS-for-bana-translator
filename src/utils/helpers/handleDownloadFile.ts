import {getDataServerUrl} from 'configuration';

interface DownloadFileProps {
  readonly url: string;
}

export const handleDownloadFile = ({url}: DownloadFileProps): void => {
  const link = document.createElement('a');
  link.href = getDataServerUrl(url);
  link.setAttribute('download', '');
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  link.remove();
};
