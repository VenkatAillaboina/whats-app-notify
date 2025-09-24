import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NotificationsModule,
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
  ],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}