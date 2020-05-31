import {  Query, Mutation, Arg } from "type-graphql";
import { User } from '../../entity/User';
import * as bcrypt from 'bcryptjs'

import "reflect-metadata"

export class RegisterResolver {
    @Query(() => String, { name: "hello", nullable: false, description: "to test working of graphql" })
    async hellow() {
        return "Hello typegraph ql";
    }

    @Mutation(() => User)
    async register(
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<User> {

        const hashedPassword = await bcrypt.hash(password, 12);
        // const user = new User({
        //     firstName,
        //     lastName,
        //     email,
        //     password: hashedPassword
        // });
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = hashedPassword;
        
        // console.log(user.id);

        user.save()
        return user;

    }
}