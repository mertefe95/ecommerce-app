export * from 'express';

declare module 'express' {
  export interface Request extends Express.Request {
    user: { userId: number; email: string; adminId: number };
  }
}
