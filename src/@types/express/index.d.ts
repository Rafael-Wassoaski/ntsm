import { IUser } from "@entities/User";

declare module "express" {
  export interface Request {
    body: any;
    session: {
      user: IUser
    };
  }
}

