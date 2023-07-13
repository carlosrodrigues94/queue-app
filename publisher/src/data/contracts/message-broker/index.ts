export interface IMessageBroker {
  publishUserCreatedNotification(data: {
    userName: string;
    email: string;
  }): Promise<void>;
}
