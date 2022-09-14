import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';
import { User } from './user.schema';

export type ImageReportDocument = ImageReport;

@Schema()
export class ImageReport extends Document {
  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  image: string;

  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'User', required: false })
  user_evaluation?: User;

  @Prop({
    type: String,
    default: 'MANUAL',
    enum: ['MANUAL', 'AUTOMATIC'],
  })
  evaluation_method: string;

  @Prop({ required: true })
  approved: boolean;

  @Prop({ required: true })
  requiresManualEvaluation: boolean;

  @Prop({ required: false })
  evaluations?: SchemaMongoose.Types.Mixed;

  @Prop({ required: true })
  evaluationDetails: SchemaMongoose.Types.Mixed;
}

export const ImageReportSchema = SchemaFactory.createForClass(ImageReport);
