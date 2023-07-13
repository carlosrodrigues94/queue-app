import { IConfig } from "@/config/config";
import { SendEmailUseCase } from "@/data/usecases/send-email.usecase";
import { SESMailerService } from "@/infra/services/ses-mailer-service";
import { SESClient } from "@aws-sdk/client-ses";

export class SendEmailUseCaseFactory {
  build(config: IConfig) {
    const sesClient = new SESClient({ region: config.getEnvs().awsRegion });
    return new SendEmailUseCase(new SESMailerService(sesClient));
  }
}
