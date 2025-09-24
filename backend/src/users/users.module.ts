import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, NotificationSchema } from "src/scheduler/schemas/notification.schema";
@Module({
    imports: [
            MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}