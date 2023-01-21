export interface IMailService {
  sendVerificationMail: (toEmail: string, name: string, token: string) => any;
}
