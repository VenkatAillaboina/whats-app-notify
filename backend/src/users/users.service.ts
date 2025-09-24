import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SchedulerService } from '../scheduler/scheduler.service';

@Injectable()
export class UsersService {
  constructor(private readonly schedulerService: SchedulerService) {}

  async scheduleUser(dto: CreateUserDto) {
    // Divide hrs into intervals
    const interval = dto.hours / 3;

    // Delegate to scheduler
    await this.schedulerService.scheduleNotifications(dto, interval);

    return { message: 'User scheduled successfully' };
  }
}
