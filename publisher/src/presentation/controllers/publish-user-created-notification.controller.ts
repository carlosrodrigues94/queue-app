import { Request, Response } from "express";
import { IPublishUserCreatedNotificationUseCase } from "@/domain/usecases/publish-user-created-notification.usecase";

export class PublishUserCreatedNotificationDTO {
  userName: string;
  email: string;
}

export interface IController {
  handle: (request: any, response: any) => Promise<any>;
}

export class PublishUserCreatedNotificationController implements IController {
  constructor(
    private readonly usecase: IPublishUserCreatedNotificationUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const body: PublishUserCreatedNotificationDTO = request.body;
    await this.usecase.execute(body);
    return response.status(201).send();
  }
}
