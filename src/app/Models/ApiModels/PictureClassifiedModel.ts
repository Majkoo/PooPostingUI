export interface PictureClassifiedModel {
  hentai: number,
  neutral: number,
  pornography: number,
  sexy: number,
  predictedLabel: string,
  isNsfw: boolean
}
