import { Session } from "next-auth";

export interface CustomSession extends Session {
  user: {
    email: string;
    name?: string;
    image?: string;
  };
  plaidLinked: boolean;
  userID: string;
}
