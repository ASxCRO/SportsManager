import nodemailer from 'nodemailer';
import { IMailService } from '../declaration/IMailService';

export class MailService implements IMailService {
  sendVerificationMail(toEmail: string, name: string, token: string) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_SENT_FROM,
      to: toEmail,
      subject: 'Verification mail',
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
        <a href="http://localhost:3322/api/auth/verify?token=${token}"> Click here</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
