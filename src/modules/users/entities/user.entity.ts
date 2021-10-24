import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Prop({ required: true })
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
