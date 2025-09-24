import { Controller, Post, Body, Get, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('scheduler')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Get()
  @ApiOperation({ summary: 'Fetch the notifications for all users' })
  @ApiResponse({ status: 200, description: 'The notifications were successfully fetched.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  public async getNotifications() {
    const notifications = await this.usersService.getNotifications();

    return {
      statusCode: HttpStatus.OK,
      message: 'Notifications fetched successfully.',
      data: notifications,
    };
  }


  @Post('schedule')
  @ApiOperation({ summary: 'Schedule a new set of notifications for a user' })
  @ApiResponse({ status: 201, description: 'The notification has been successfully scheduled.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  public scheduleUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.scheduleUser(createUserDto);
  }

}