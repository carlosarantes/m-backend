import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';
import { User } from './user.schema';

export type ImageReportDocument = ImageReport;

@Schema()
export class ImageReport extends Document {
  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  user_evaluation_id: string;

  @Prop({
    type: String,
    default: 'MANUAL',
    enum: ['MANUAL', 'AUTOMATIC'],
  })
  evaluation_method: string;
}

export const ImageReportSchema = SchemaFactory.createForClass(ImageReport);
