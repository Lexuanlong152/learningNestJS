import { Injectable } from "@nestjs/common";
import { UserDto } from "./user.dto";
// import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    // constructor ( userRepository: UserRepository){}
    createUser(user: any): any {
        user.id = 1;
        user.CreatedDate = new Date();
        user.ModifiedDate = new Date();
        // let userReal =plainToClass(UserDto,user, {excludeExtranseousValues: true});
        // console.log(userReal);
        return UserDto.plainToClass(user);
      }
    
}