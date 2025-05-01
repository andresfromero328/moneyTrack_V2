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

export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  image: string;
  isOAuth: boolean;
  plaidLinked: boolean;
  plaidAccessToken: string;
  plaidItemID: string;
}

export interface BudgetDocument {
  userID: string;
  budgetName: string;
  budgetAmount: number;
  mCategory: string;
  sCategory: string;
  cCategory: string;
}

export interface BudgetTransaction {
  name: string;
  amount: number;
  date: string;
  mCategory: string;
  sCategory: string;
}

export interface CreateBudget {
  success: boolean;
  message: string;
  budget: {
    name: string;
    amount: string;
    mCategory: string;
    sCategory: string;
    cCategory: string;
  } | null;
}
