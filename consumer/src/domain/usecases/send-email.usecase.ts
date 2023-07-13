export type SentEmailUseCasePayload = {
  email: string;
  userName: string;
};

export interface ISendEmailUseCase {
  execute: (payload: SentEmailUseCasePayload) => Promise<void>;
}
