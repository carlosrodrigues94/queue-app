import { IPublishUserCreatedNotificationUseCase } from "@/domain/usecases/publish-user-created-notification.usecase";
import { PublishUserCreatedNotificationController } from "@/presentation/controllers/publish-user-created-notification.controller";
import { Router as ExpressRouter } from "express";
import express from "express";
const router = ExpressRouter();
router.use(express.json());

export class Router {
  constructor(
    private readonly controller: PublishUserCreatedNotificationController
  ) {}
  getInstance() {
    return router;
  }

  buildRoutes() {
    router.post("/notification-test", (req, res) => {
      return this.controller.handle(req, res);
    });
  }
}
