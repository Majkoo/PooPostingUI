export interface Picture {
  id: string;
  accountId: string;
  accountNickname: string;
  name: string;
  description: string;
  tags: string[];
  url: string;
  pictureAdded: string;
  likes: number;
  dislikes: number;
}
