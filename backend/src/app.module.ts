import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthGuard],
})
export class AppModule {}
