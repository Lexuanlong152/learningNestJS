import { BadRequestException, Injectable } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "shared/providers";
@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService){}

    async getMyUser(id: number , req : Request){
      console.log(id)
      const user =await this.prismaService.user.findUnique({
        where: {id: +id}
      })
      if(user){
        return user;
      }else{
        throw new BadRequestException('User not found')
      }
       
    }
    createUser(user: any): any {
        user.id = 1;
        user.CreatedDate = new Date();
        user.ModifiedDate = new Date();
        
       return '';
      }
    
}