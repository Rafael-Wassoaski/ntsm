import { Session } from 'express-session';

declare module 'express-session' {
  export interface session {
    user: any;
  }
}
