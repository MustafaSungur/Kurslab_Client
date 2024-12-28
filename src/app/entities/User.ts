import { Comment } from './Comment';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  createdDate: string;
  updatedDate?: string;
  email: string;
  state: string;
  role: string;
  image?: string;
  comments?: Comment[];
}
