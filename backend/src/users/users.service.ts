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
    // Combine date and time strings into a single Date object
    const initialDateTime = parse(dateTimeString, 'yyyy-MM-dd h:mm a', new Date());

    // Validate if the created date is valid
     if (isNaN(initialDateTime.getTime())) {
      // If the first parse failed, try the 24-hour format as a fallback
      const initialDateTime24 = parse(dateTimeString, 'yyyy-MM-dd HH:mm', new Date());
      if (isNaN(initialDateTime24.getTime())) {
          throw new BadRequestException("Invalid date or time format. Use 'YYYY-MM-DD' and 'HH:mm' or 'h:mm a'.");
      }
      // Use the successfully parsed 24-hour date
      Object.assign(initialDateTime, initialDateTime24);
    }

    const firstNotificationTime = new Date(initialDateTime);
    firstNotificationTime.setMinutes(firstNotificationTime.getMinutes()+3);

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

    return {
      statusCode: 201,
      message: 'Notifications scheduled successfully and saved to database.' 
    };
  }
}