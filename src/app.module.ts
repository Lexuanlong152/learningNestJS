import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { UserService } from './modules/users/user.service';
import { AuthModule } from './modules/auth/auth.module';

import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ UserModule, SharedModule,AuthModule], 
  controllers: [AppController],
  providers: [{
    provide: 'APP_USER',
    useClass: UserService
  }, AppService],
})
export class AppModule {}
