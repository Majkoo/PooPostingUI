export interface PictureUploadData {
  cropBoxData: {
    top: number | null,
    left: number | null,
    width: number | null
  },
  croppedFileUrl: string,
  rawFileUrl: string,
  aspectRatio: number
}
