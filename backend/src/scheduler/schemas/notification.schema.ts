import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;
  
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  initialDateTime: Date; // The combined start date and time from the form

  @Prop({ required: true })
  nextNotificationTime: Date;

  @Prop({ default: 0 })
  sentCount: number;

  @Prop({ default: false })
  isCompleted: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);