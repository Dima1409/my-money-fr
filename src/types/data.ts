export interface ISearchWallet {
  _id: string;
  name: string;
  total: number;
}
export interface ISearchCategory {
  _id: string;
  add: [string];
  sell: [string];
}
export interface ISearchOperation {
  _id: string;
  add: number;
  sell: number;
  category: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
