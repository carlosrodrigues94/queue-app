import { config } from "dotenv";

config();

export interface IConfig {
  getEnvs(): {
    rabbitMQHost: string;
    rabbitMQPort: string;
    rabbitMQuser: string;
    rabbitMQPassword: string;
  };
}

export class Config implements IConfig {
  getEnvs() {
    return {
      rabbitMQHost: process.env.RABBITMQ_HOST,
      rabbitMQPort: process.env.RABBITMQ_PORT,
      rabbitMQuser: process.env.RABBITMQ_USERNAME,
      rabbitMQPassword: process.env.RABBITMQ_PASSWORD,
    };
  }
}
