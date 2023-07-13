import { Config } from "@/config/config";
import { IMessageBroker } from "@/data/contracts/message-broker";
import { Channel } from "amqp-connection-manager";
import { Connection, connect } from "amqplib";

export class RabbitMQServer implements IMessageBroker {
  private uri: string;
  private connection: Connection;
  private channel: Channel;
  public queues = { USERS_USER_CREATED: "users.user.created" };

  constructor(private readonly config: Config) {
    const { rabbitMQHost, rabbitMQPassword, rabbitMQPort, rabbitMQuser } =
      this.config.getEnvs();
    this.uri = `amqp://${rabbitMQuser}:${rabbitMQPassword}@${rabbitMQHost}:${rabbitMQPort}`;
  }
  async publishUserCreatedNotification(data: {
    userName: string;
    email: string;
  }): Promise<void> {
    await this.publish({
      message: data,
      queueName: this.queues.USERS_USER_CREATED,
    });
  }

  async start(): Promise<void> {
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();
    await this.startQueues();
  }

  private async publish<T = Record<string, string | number>>(data: {
    queueName: string;
    message: T;
  }) {
    this.channel.sendToQueue(
      data.queueName,
      Buffer.from(JSON.stringify(data.message))
    );
  }

  private async startQueues(): Promise<void> {
    for await (const queue of Object.values(this.queues)) {
      await this.channel.assertQueue(queue, {
        durable: true,
      });
    }
  }
}
