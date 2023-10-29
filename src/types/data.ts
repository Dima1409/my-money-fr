export interface ISearchWallet {
  _id: string;
  name: string;
  total: number;
}
export interface ISearchCategoryAdd {
  _id: string;
  add: Array<{
    _id: string;
    name: string;
  }>;
}
export interface ISearchCategorySell {
  _id: string;
  sell: Array<{
    _id: string;
    name: string;
  }>;
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
