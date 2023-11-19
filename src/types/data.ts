export interface ISearchWallet {
  _id: string;
  name: string;
  total: number;
}
export interface ISearchCategory {
  _id: string;
  name: string;
  type: string;
}


export interface ISearchOperation {
  _id: string;
  amount: number;
  type: boolean;
  category: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  wallet: string;
}
