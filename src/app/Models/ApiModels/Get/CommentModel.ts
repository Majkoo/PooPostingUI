export interface CommentModel {
  id: string;

  authorNickname: string,
  authorId: string,

  pictureId: string,
  text: string,

  isModifiable: boolean,
  isAdminModifiable: boolean,

  commentAdded: string
}
