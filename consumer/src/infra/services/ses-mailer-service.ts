import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import {
  IMailerService,
  MailerServiceSendEmailPayload,
} from "@/data/contracts/services/mailer.service";

export class SESMailerService implements IMailerService {
  constructor(private readonly ses: SESClient) {}
  async sendEmail(payload: MailerServiceSendEmailPayload) {
    const command = this.createSendEmailCommand(payload);
    await this.ses.send(command);
  }

  private createSendEmailCommand(payload: MailerServiceSendEmailPayload) {
    const command = new SendEmailCommand({
      Destination: {
        CcAddresses: [],
        ToAddresses: [payload.to],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: payload.body,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: payload.subject,
        },
      },
      Source: payload.from,
    });
    return command;
  }
}
