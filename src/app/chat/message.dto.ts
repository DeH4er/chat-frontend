import { UserDto } from '../auth/user.dto';

export interface MessageDto {
  id: number;
  message: string;
  author: UserDto;
  created: Date;
  updated: Date;
}
