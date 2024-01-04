export interface ISearchWallet {
  _id: string | null;
  name: string;
  total?: number;
}
export interface ISearchCategory {
  _id: string;
  name: string;
  type: string;
}

export interface ISearchOperation {
  _id: string;
  amount: number;
  type: string;
  category: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  wallet: string;
}
