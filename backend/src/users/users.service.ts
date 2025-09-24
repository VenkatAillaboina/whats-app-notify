import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-users.dto';
import { Notification, NotificationDocument, NotificationSchema } from '../scheduler/schemas/notification.schema';
import { parse } from 'date-fns';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async getNotifications(){
    try {
      const notifications = await this.notificationModel.find().exec();
      return notifications;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch notifications.', error);
    }
  }

  async scheduleUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, phone, message, date, time } = createUserDto;

    const dateTimeString = `${date} ${time}`;
    
    // Prioritize the 24-hour format, then fall back to 12-hour format
    let initialDateTime = parse(dateTimeString, 'yyyy-MM-dd HH:mm', new Date());

    if (isNaN(initialDateTime.getTime())) {
      initialDateTime = parse(dateTimeString, 'yyyy-MM-dd h:mm a', new Date());
    }

    // Validate if the created date is valid after trying both formats
    if (isNaN(initialDateTime.getTime())) {
      throw new BadRequestException("Invalid date or time format. Use 'YYYY-MM-DD' and 'HH:mm' or 'h:mm a'.");
    }

    const firstNotificationTime = new Date(initialDateTime);
    firstNotificationTime.setMinutes(firstNotificationTime.getMinutes() + 3);

    const newNotification = new this.notificationModel({
      firstName,
      lastName,
      email,
      phone,
      message,
      initialDateTime,
      nextNotificationTime: firstNotificationTime, 
      sentCount: 0,
      isCompleted: false,
    });

    await newNotification.save();

    return {
      statusCode: 201,
      message: 'Notifications scheduled successfully and saved to database.'
    };
  }
}