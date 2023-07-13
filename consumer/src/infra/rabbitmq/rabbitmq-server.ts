import { Connection, ConsumeMessage, connect, Channel } from "amqplib";
import { Config } from "@/config/config";

export class RabbitMQServer {
  private uri: string;
  private connection: Connection;
  private channel: Channel;
  public queues = { USERS_USER_CREATED: "users.user.created" };

  constructor(private readonly config: Config) {
    const { rabbitMQHost, rabbitMQPassword, rabbitMQPort, rabbitMQuser } =
      this.config.getEnvs();
    this.uri = `amqp://${rabbitMQuser}:${rabbitMQPassword}@${rabbitMQHost}:${rabbitMQPort}`;
  }

  async start(): Promise<void> {
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();
    await this.startQueues();
  }

  async consume<T = Record<string, string | number>>(
    queueName: string,
    callback: (message: T) => void
  ) {
    await this.channel.consume(
      queueName,
      (message: ConsumeMessage) => {
        const parsed = JSON.parse(message.content.toString());
        callback(parsed);
        this.channel.ack(message);
      },
      {
        consumerTag: "queue-app-consumer",
      }
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
