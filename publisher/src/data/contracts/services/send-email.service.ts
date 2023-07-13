export interface ISendEmailService {
  send: (email: string) => Promise<void>;
}
