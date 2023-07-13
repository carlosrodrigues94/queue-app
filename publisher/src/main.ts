import { Config } from "./config/config";
import { Router } from "./main/router";
import { startExpressInstance } from "./main/express-instance";
import { RabbitMQServer } from "./infra/rabbitmq/rabbitmq-server";
import { PublishUserCreatedNotificationControllerFactory } from "./presentation/factories/controllers/publish-user-created-notification-controller.factory";
import { PublishUserCreatedNotificationController } from "./presentation/controllers/publish-user-created-notification.controller";
import { PublishUserCreatedNotificationUseCase } from "./data/usecases/publish-user-created-notification.usecase";

async function bootstrap() {
  const config = new Config();

  const server = new RabbitMQServer(config);
  await server.start();

  const controller =
    PublishUserCreatedNotificationControllerFactory.build(server);

  const router = new Router(controller);
  router.buildRoutes();

  await startExpressInstance(router.getInstance());
}

bootstrap();
