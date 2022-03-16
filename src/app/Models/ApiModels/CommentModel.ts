export interface CommentModel {
  id: string;
  authorNickname: string,
  authorId: string,
  pictureId: string,
  text: string,
  isModifiable: boolean,
  commentAdded: string
}
