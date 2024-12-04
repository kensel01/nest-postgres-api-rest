import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstans } from './constants/jwt.constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstans.secret,
      signOptions: {expiresIn: '1h'},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
