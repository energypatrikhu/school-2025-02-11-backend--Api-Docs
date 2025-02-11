import { IsInt, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateCatDto {
  /**
   * The name of the cat
   * @example 'Whiskers'
   */
  @IsString()
  name: string;

  /**
   * The age of the cat
   * @example 3
   */
  @IsInt()
  @IsPositive()
  age: number;

  /**
   * The URL of the cat's picture
   * @example 'https://example.com/cat.jpg'
   */
  @IsUrl()
  pictureUrl: string;
}
