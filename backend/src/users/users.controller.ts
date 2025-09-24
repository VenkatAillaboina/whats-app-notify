import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('scheduler')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post('schedule')
  @ApiOperation({ summary: 'Schedule a new set of notifications for a user' })
  @ApiResponse({ status: 201, description: 'The notification has been successfully scheduled.'})
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.'})
  public scheduleUser(@Body() createUserDto: CreateUserDto) {
    return  this.usersService.scheduleUser(createUserDto);
  }
}