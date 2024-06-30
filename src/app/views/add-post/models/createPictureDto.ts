import {PostVisibility} from "../../../shared/utility/enums/postVisibility";

export interface CreatePictureDto {
  tags: string[],
  description: string,
  visibilityOption: PostVisibility,
  url: string,
}
