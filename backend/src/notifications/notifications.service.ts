import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer'; // Import the Transporter type
import { Twilio } from "twilio";


@Injectable()
export class NotificationsService {
    private transporter:Transporter;
    private client: Twilio;

    constructor(private readonly configService: ConfigService) {
        const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
        const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
        this.client = new Twilio(accountSid, authToken);

        this.transporter = nodemailer.createTransport(
            {

                host: this.configService.get<string>('EMAIL_HOST'),
                port: this.configService.get<number>('EMAIL_PORT'),
                secure: false,
                auth: {
                    user: this.configService.get<string>('EMAIL_USER'),
                    pass: this.configService.get<string>('EMAIL_PASSWORD'),
                },
            }
        )
    }
    
    //Service to Send Whatsapp Message
    async sendWhatsAppMessage(to: string, body: string) {
        try {
            const message = await this.client.messages.create({
                body,
                from: `whatsapp:${this.configService.get<string>('TWILIO_PHONE_NUMBER')}`,
                to: `whatsapp:${to}`,
            });
            console.log(`Message sent with SID: ${message.sid}`);
            return message;
        } catch (error) {
            console.error('Error sending WhatsApp message:', error);
            throw error;
        }
    }

    // Service to send Email to Customer
    async sendMail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: `"From Tapza " <${this.configService.get<string>('EMAIL_USER')}>`,
            to,
            subject,
            text,
        };

        return this.transporter.sendMail(mailOptions);
    }
}