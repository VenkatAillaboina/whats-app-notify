import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { NotificationsService } from '../notifications/notifications.service';
import { Notification, NotificationDocument } from './schemas/notification.schema';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly notificationsService: NotificationsService,
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    this.logger.log('Checking for scheduled notifications to send...');

    const now = new Date();

    const notificationsToSend = await this.notificationModel.find({
      isCompleted: false,
      nextNotificationTime: { $lte: now },
    }).exec();

    if (notificationsToSend.length === 0) {
      return;
    }

    for (const notification of notificationsToSend) {
      // --- Create a more personalized message ---
      const message = `Hi ${notification.firstName}! This is reminder #${notification.sentCount + 1} for your message: "${notification.message}"`;

      // --- Send Notifications ---
      await this.notificationsService.sendMail(notification.email, 'Scheduled Notification', message);
      this.logger.log(`Email sent to ${notification.email}`);

      await this.notificationsService.sendWhatsAppMessage(notification.phone, message);
      this.logger.log(`WhatsApp message sent to ${notification.phone}`);

      // --- Update the Database Record ---
      const newSentCount = notification.sentCount + 1;
      const isCompleted = newSentCount >= 3;

      // Set the next notification for 1 hour after the last one
      const nextTime = new Date(notification.nextNotificationTime);
      nextTime.setMinutes(nextTime.getMinutes() + 3);
      // nextTime.setHours(nextTime.getHours() + 1);

      await this.notificationModel.updateOne(
        { _id: notification._id },
        {
          $set: {
            sentCount: newSentCount,
            isCompleted: isCompleted,
            nextNotificationTime: nextTime,
          },
        },
      );
      
      this.logger.log(`Updated notification schedule for ${notification.email}`);
    }
  }
}