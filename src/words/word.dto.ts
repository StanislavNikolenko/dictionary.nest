import { User } from "src/users/user.schema";
import { ApiProperty } from "@nestjs/swagger";

export class CreateWordDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  language: string;

  @ApiProperty()
  value: string;
}

export class UpdateWordDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  language: string;

  @ApiProperty()
  value: string;
}
