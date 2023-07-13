export type PublishUserCreatedNotificationUseCasePayload = {
  userName: string;
  email: string;
};

export interface IPublishUserCreatedNotificationUseCase {
  execute(payload: PublishUserCreatedNotificationUseCasePayload): Promise<void>;
}
