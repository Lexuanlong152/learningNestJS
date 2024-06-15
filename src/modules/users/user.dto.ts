import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';


export class UserDto {
  @IsNotEmpty()
  @Expose()
  username: string;

  firstName: string;

  lastName: string;

  @Expose()
  @Transform(({obj})=>obj.firstName + ' ' + obj.lastName)
  fullName: string;

  @Expose()
  @Length(6, 20)
  @IsNotEmpty()
  password: string;
}
