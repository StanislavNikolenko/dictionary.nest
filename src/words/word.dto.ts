import { User } from "src/users/user.schema";

export class CreateWordDto {
  user: User;
  language: string;
  value: string;
}

export class UpdateWordDto {
  user: User;
  language: string;
  value: string;
}
