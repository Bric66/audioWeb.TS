import {SentMessageInfo} from "nodemailer";

export interface MailGateway{
    SendInvitation(email:string,organisation:string):Promise<SentMessageInfo>
}