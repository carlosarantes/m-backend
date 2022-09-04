import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User;

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date_birthday: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: true,
    set: function (password: string) {
      return bcrypt.hashSync(password, 10);
    },
  })
  password: string;

  @Prop({ required: true })
  current_avatar: string;

  @Prop({ required: false })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
