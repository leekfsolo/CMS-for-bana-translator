const dataFileTypes = ['application/x-zip-compressed'];

export default function validFileType(fileType: string) {
  return dataFileTypes.includes(fileType);
}
