import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-users.dto';
import { Notification, NotificationDocument } from '../scheduler/schemas/notification.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async scheduleUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, phone, message, date, time } = createUserDto;

    // Combine date and time strings into a single Date object
    const initialDateTime = new Date(`${date}T${time}`);

    // Validate if the created date is valid
    if (isNaN(initialDateTime.getTime())) {
      throw new BadRequestException('Invalid date or time format.');
    }

    // For this example, let's set notifications for 1, 2, and 3 hours after the selected time.
    // You can customize this interval logic as needed.
    const firstNotificationTime = new Date(initialDateTime);
    firstNotificationTime.setHours(firstNotificationTime.getHours() + 1);

    const newNotification = new this.notificationModel({
      firstName,
      lastName,
      email,
      phone,
      message,
      initialDateTime,
      nextNotificationTime: firstNotificationTime, // The first notification is due 1 hour after the start time
      sentCount: 0,
      isCompleted: false,
    });

    await newNotification.save();

    return { message: 'Notifications scheduled successfully and saved to database.' };
  }
}