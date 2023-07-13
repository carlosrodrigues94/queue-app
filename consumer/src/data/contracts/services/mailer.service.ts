export type MailerServiceSendEmailPayload = {
  to: string;
  body: string;
  subject: string;
  from: string;
};

export interface IMailerService {
  sendEmail: (payload: MailerServiceSendEmailPayload) => Promise<void>;
}
