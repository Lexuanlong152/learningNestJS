import { Injectable , BadRequestException, ForbiddenException} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../../utils/constants';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) {}

    async signUp( dto: AuthDto ){
       
        const {email, password} = dto;
        await this.prismaService.user.findUnique({
            where: { email },
        }).then(async (user)=> {
            if(user){
                throw new BadRequestException('Email already exists');
            }
            else{
                const hashedPassword = await this.hashPassword(password);
                await this.prismaService.user.create({
                    data: {
                        email,
                        hashedPassword,   
                    },
                });
                
            }
        
        })
        return 'Sign In Successful!';  
    }
    async signin(dto: AuthDto, req: Request, res: Response){
        const { email, password } = dto;
        let foundUser
        await this.prismaService.user.findUnique({
            where: {
              email,
            },
        }).then(async (user)=>{
            if(!user ){
                throw new BadRequestException('Wrong credentials');
            }else{
                const compareSuccess = await this.comparePasswords({
                    password,
                    hashPassword: user.hashedPassword,
                });
                console.log('compareSuccess:', compareSuccess)

                if (!compareSuccess) {
                    throw new BadRequestException('Wrong credentials');
                }
                const token = await this.signToken({
                    userId: user.id,
                    email: user.email,
                });
                console.log(token); 
              
                if (!token) {
                    throw new ForbiddenException('Could not signin');
                }
              
                res.cookie('token', token, {});
              
                return res.send({ message: 'Logged in succefully' });
            }
        })
      
        
    }

    async hashPassword(password: string): Promise<string> {
        const countOfHash = 10;
    
        return await bcrypt.hash(password, countOfHash);
    }
    
    async comparePasswords(args: { hashPassword: string; password: string }) {
        return await bcrypt.compare(args.password, args.hashPassword);
      }
    
    async signToken(args: { userId: string; email: string }) {
        const payload = {
          id: args.userId,
          email: args.email,
        };
    
        const token = await this.jwtService.signAsync(payload, {
          secret: jwtSecret,
        });
    
        return token;
    }
}
