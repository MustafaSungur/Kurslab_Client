import { Content } from './Content';

export class ContentUser {
  userId?: string;
  userName?: string;
  contentId: number;
  content?: Content;
  createdDate: string;
}
