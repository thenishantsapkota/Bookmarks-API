import { IsNotEmpty, IsString } from 'class-validator';

export class BookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
