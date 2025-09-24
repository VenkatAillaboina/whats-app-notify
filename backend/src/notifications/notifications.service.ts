import { Injectable, InternalServerErrorException, BadGatewayException, Logger } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { Twilio } from "twilio";

@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(NotificationsService.name);
    private transporter: Transporter;
    private client: Twilio;

    constructor(private readonly configService: ConfigService) {
        const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
        const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
        this.client = new Twilio(accountSid, authToken);

        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: this.configService.get<number>('EMAIL_PORT'),
            secure: false, // or true if you are using port 465
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASSWORD'),
            },
        });
    }

    /**
     * Service to Send Whatsapp Message
     * Throws BadGatewayException if Twilio service fails
     */
    async sendWhatsAppMessage(to: string, body: string) {
        try {
            const message = await this.client.messages.create({
                body,
                from: `whatsapp:${this.configService.get<string>('TWILIO_PHONE_NUMBER')}`,
                to: `whatsapp:${to}`,
            });
            this.logger.log(`WhatsApp message sent with SID: ${message.sid}`);
            return message;
        } catch (error) {
            this.logger.error(`Failed to send WhatsApp message to ${to}`, error.stack);
            // This error indicates a problem with the external service (Twilio)
            throw new BadGatewayException('Failed to send WhatsApp message via Twilio.');
        }
    }

    /**
     * Service to send Email to Customer
     * Throws InternalServerErrorException if Nodemailer fails
     */
    async sendMail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: `"From Tapza " <${this.configService.get<string>('EMAIL_USER')}>`,
            to,
            subject,
            text,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            this.logger.log(`Email sent successfully to ${to}: ${info.messageId}`);
            return info;
        } catch (error) {
            this.logger.error(`Failed to send email to ${to}`, error.stack);
            // This error indicates a problem within our application's email configuration or transport
            throw new InternalServerErrorException('Failed to send email.');
        }
    }
}