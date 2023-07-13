import { ISendEmailUseCase, SentEmailUseCasePayload } from "@/domain/usecases/";
import { IMailerService } from "../contracts/services/mailer.service";

export class SendEmailUseCase implements ISendEmailUseCase {
  protected from = "carlos.1994hrs@gmail.com";
  constructor(private readonly mailerService: IMailerService) {}
  async execute(payload: SentEmailUseCasePayload): Promise<void> {
    await this.mailerService.sendEmail({
      body: `Welcome to out platform ${payload.userName}!`,
      subject: "User Created",
      to: payload.email,
      from: this.from,
    });
  }
}
