import { CommentLike } from './CommentLike';
import { User } from './User';

export class Comment {
  id: number;
  description: string;
  user?: User;
  userName?: string;
  contentId: number;
  contentTitle?: string;
  likes?: CommentLike[];
  createdDate: string;
}
