import { IMessageBroker } from "@/data/contracts/message-broker";
import { PublishUserCreatedNotificationController } from "@/presentation/controllers/publish-user-created-notification.controller";
import { PublishUserCreatedNotificationUseCase } from "@/data/usecases/publish-user-created-notification.usecase";

export class PublishUserCreatedNotificationControllerFactory {
  static build(messageBroker: IMessageBroker) {
    const usecase = new PublishUserCreatedNotificationUseCase(messageBroker);
    return new PublishUserCreatedNotificationController(usecase);
  }
}
