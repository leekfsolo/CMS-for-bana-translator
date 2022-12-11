const dataFileTypes = ['text/plain', 'text/csv'];

export default function validFileType(fileType: string) {
  return dataFileTypes.includes(fileType);
}
