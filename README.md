<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


# NestJS CRUD API

This booklet is a guided lab for building a NestJS CRUD API with MongoDB. It is written for a university lab session: clear steps, a clean flow, and code blocks you can copy. The flow starts from a fresh project and ends with a working CRUD API backed by MongoDB.

## Booklet flow (fresh project to CRUD)

1) Create a new NestJS project
2) Run the app and verify the Hello World page
3) Generate the `users` CRUD resource
4) Create the MongoDB schema for `users`
5) Register the schema in the module
6) Implement service logic (CRUD operations)
7) Connect controller routes to the service
8) Connect the app to MongoDB Atlas
9) Test endpoints

## Nest CLI commands used

These are the exact Nest CLI commands we used to create the project files and structure:

```bash
nest new backend
npm i @nestjs/mongoose mongoose
npm start
nest g mo users
nest g cl users/schema/users.schema --flat --no-spec
nest g s users --no-spec
nest g co users --no-spec
```

## Prerequisites

- Node.js (LTS recommended)
- npm (or your preferred package manager)
- NestJS CLI installed globally (`npm i -g @nestjs/cli`)
- A MongoDB Atlas account

## Part 1: Fresh project setup

### 1.1 Create the project

```bash
nest new backend
```

Choose `npm` when prompted.

### 1.2 Enter the project folder

```bash
cd backend
```

### 1.3 Run the server

```bash
npm run start
```

Open `http://localhost:3000` and confirm the Hello World page.

### 1.4 (Optional) Debug with VS Code (Attach)

- Run and Debug > Create launch.json > Node.js > Node.js: Attach
- Start debug mode:

```bash
npm run start:debug
```

Confirm the server still responds at `http://localhost:3000`.

## Part 2: Generate CRUD files

We will build a `users` resource.

### 2 Confirm routes

Nest generates standard routes:

- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`

## Part 3: MongoDB connection

### 3.1 Create a MongoDB Atlas database

1) Sign up for MongoDB Atlas.
2) Create a cluster.
3) Create a database and a collection.
4) Copy the DNS connection string for the cluster.

### 3.2 Install Mongoose

```bash
npm i @nestjs/mongoose mongoose
```

### 3.3 Configure the MongoDB URI

This project sets the URI in [backend/src/app.module.ts](backend/src/app.module.ts). Use the DNS string from Atlas:


```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://<user>:<password>@crudcluster.6pfkbzp.mongodb.net/<db_name>?appName=CRUDCluster'),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

Replace the placeholders with your Atlas credentials and database name.

## Part 4: Build the users feature

This section shows the code we changed to move from a fresh project to a working CRUD API. Use these blocks to align your project.

### 4.1 User schema

From [backend/src/users/schema/users.schema.ts](backend/src/users/schema/users.schema.ts):

```ts
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

```

### 4.2 Users module

From [backend/src/users/users.module.ts](backend/src/users/users.module.ts):

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

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
    controllers: [UsersController],

})
export class UsersModule { }
```

### 4.3 Users service

From [backend/src/users/users.service.ts](backend/src/users/users.service.ts):

```ts
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

```

### 4.4 Users controller

From [backend/src/users/users.controller.ts](backend/src/users/users.controller.ts):

```ts
import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schema/users.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Post()
    async createUser(@Body() user: User) {
        return this.usersService.createUser(user);
    }

    @Get(':_id')
    async getUserById(@Param('_id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Put(':_id')
    async updateUser(@Param('_id') id: string, @Body() user: Partial<User>) {
        return this.usersService.updateUser(id, user);
    }

    @Delete(':_id')
    async deleteUser(@Param('_id') id: string) {
        return this.usersService.deleteUser(id);
    }
}

```

## Part 5: Test the API

Start the server if it is not running:

```bash
npm run start
```

Use Postman or curl to test the endpoints.

## Troubleshooting

- Port already in use: stop the other server or change the port in `main.ts`.
- MongoDB connection errors: verify username, password, and IP access in Atlas.
- Mongoose warning about `new` option: use `returnDocument: 'after'` for updates.

## Lab checklist

- Project created and server running
- CRUD resource generated
- MongoDB connected
- Schema, module, service, controller updated
- Routes tested

## Next exercises

- Add schema validation with decorators
- Implement a service method for filtered search
- Add pagination to `GET /users`
