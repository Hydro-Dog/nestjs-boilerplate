import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot()  // insert typeorm module to the app
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
