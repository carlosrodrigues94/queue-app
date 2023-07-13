import {
  IPublishUserCreatedNotificationUseCase,
  PublishUserCreatedNotificationUseCasePayload,
} from "@/domain/usecases/publish-user-created-notification.usecase";
import { IMessageBroker } from "../contracts/message-broker";

export class PublishUserCreatedNotificationUseCase
  implements IPublishUserCreatedNotificationUseCase
{
  constructor(private readonly messageBroker: IMessageBroker) {}
  async execute(
    payload: PublishUserCreatedNotificationUseCasePayload
  ): Promise<void> {
    await this.messageBroker.publishUserCreatedNotification(payload);
  }
}
