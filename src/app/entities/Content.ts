import { Category } from './Category';
import { Comment } from './Comment';
import { User } from './User';

export class Content {
  id: number;
  title: string;
  description?: string;
  videoUrl?: string;
  imageUrl?: string;
  viewCount: number;
  ratingCount: number;
  rating: number;
  duration: number;
  createdDate: string;
  createdUser?: User;
  category: Category;
  comments?: Comment[];
  contentTags?: any[];
  commentCount: number;
}
