import { ISendEmailUseCase } from "@/domain/usecases";
import { UserCreatedDTO } from "../dtos/user-created.dto";

export class UserCreatedController {
  constructor(private readonly sendEmailUseCase: ISendEmailUseCase) {}
  async handle(data: UserCreatedDTO) {
    await this.sendEmailUseCase.execute(data);
  }
}
