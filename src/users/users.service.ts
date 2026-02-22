import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async createUser(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async updateUser(id: string, user: Partial<User>): Promise<User | null> {
        return this.userModel
            .findByIdAndUpdate(id, user, { returnDocument: 'after' })
            .exec();
    }

    async deleteUser(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
