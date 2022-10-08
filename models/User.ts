import { getModelForClass, prop, Severity, modelOptions, pre } from "@typegoose/typegoose";
import argon2 from "argon2";
import { nanoid } from "nanoid";

@pre<User>("save", async function(){
    if(!this.isModified("password")){
        return;
    }
    this.password = await argon2.hash(this.password);

    return;
})

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
    allowMixed: Severity.ALLOW
    }
})
export class User{
    @prop({required: true, unique: true })
    email:string

    @prop({required: true})
    name:string

    @prop({required: true})
    password:string

    @prop({default: false})
    verified:boolean

    @prop({required: true, default: ()=> nanoid()})
    verificationToken:string

    @prop({required: true})
    passwordResetToken: string | null
}

let UserModel = getModelForClass(User);

export default UserModel;