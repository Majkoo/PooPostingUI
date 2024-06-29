import {PostVisibility} from "../../../shared/utility/enums/postVisibility";

export interface CreatedPostData {
  tags: string[],
  description: string,
  visibilityOption: PostVisibility,
  url: string,
}
