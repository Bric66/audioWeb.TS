import nodemailer, {SentMessageInfo} from "nodemailer";

export class NodeMailerGateway {

    async SendInvitation(email: string,organisationName:string): Promise<SentMessageInfo>{

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
        logger: true
    });

    const info = await transporter.sendMail({
        from: '"Roger" <audioweb@gmail.com>',
        to: `${email}`,
        subject: `Hello, You are invited to join ${organisationName}`,
        text: "Join us, the force will be with you"
    });

    console.log("Message sent: %s", info.response);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}}
