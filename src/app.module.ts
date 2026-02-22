import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://chamara:6526560@crudcluster.6pfkbzp.mongodb.net/crud_db?appName=CRUDCluster')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
