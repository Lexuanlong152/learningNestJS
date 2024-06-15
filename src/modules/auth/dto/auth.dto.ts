import { Expose, plainToClass} from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email: string;
  
    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: 'Passowrd has to be at between 3 and 20 chars' })
    public password: string;

    static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T {
      return plainToClass(this, obj, { excludeExtraneousValues: true });
    }
  }