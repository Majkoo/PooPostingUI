import {AccountModel} from "./AccountModel";
import {PictureModel} from "./PictureModel";

export interface PopularModel {
  MostPicAccs: AccountModel[],
  MostLikedAccs: AccountModel[],

  MostLikedPics: PictureModel[],
  MostCommentedPics: PictureModel[],
  MostVotedPics: PictureModel[]
}
