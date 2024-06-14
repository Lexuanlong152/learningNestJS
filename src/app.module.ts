import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/product.module';
import { UserModule } from './modules/users/user.module';
import { UserService } from './modules/users/user.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ UserModule, AuthModule, PrismaModule], 
  controllers: [AppController],
  providers: [{
    provide: 'APP_USER',
    useClass: UserService
  }, AppService],
})
export class AppModule {}
