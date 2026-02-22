import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { UsersService } from './users.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { 
                name: User.name, 
                schema: UserSchema, 
                collection: 'users' 
            }
        ]),
    ],
    providers: [UsersService],

})
export class UsersModule { }
