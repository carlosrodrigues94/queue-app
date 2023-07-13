import { Config } from "./config/config";
import { RabbitMQServer } from "./infra/rabbitmq/rabbitmq-server";
import { SentEmailUseCasePayload } from "./domain/usecases/send-email.usecase";
import { SendEmailUseCaseFactory } from "./presentation/factories/send-email-usecase.factory";
import { UserCreatedController } from "./presentation/controllers/user-created.controller";

async function bootstrap() {
  const config = new Config();

  const server = new RabbitMQServer(config);

  await server.start();

  const controller = new UserCreatedController(
    new SendEmailUseCaseFactory().build(config)
  );

  await server.consume<SentEmailUseCasePayload>(
    server.queues.USERS_USER_CREATED,
    (data) => controller.handle(data)
  );
}

bootstrap();
