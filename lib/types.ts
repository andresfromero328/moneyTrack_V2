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

export interface Subscription {
  name: string;
  firstDate: string;
  amount: number;
  id: string;
}

export interface OverviewTransaction {
  name: string;
  amount: number;
  date: string;
}
