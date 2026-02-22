import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import { version } from "os";

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    created_at: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
