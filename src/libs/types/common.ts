export interface ReactChildren {
  children: React.ReactNode;
}

export interface IBaseMaster {
  id: number;
  name: string;
}

export interface IError {
  response: {
    data: {
      message: string | Record<string, unknown>;
      error: string;
      statusCode: number;
    };
  };
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface DataPagination<T extends any[]> {
  data: T;
  meta: {
    currentPage: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface IMetadata {
  tokenId: string;
  name: string;
  image: string;
  animation_url?: string;
  collection_address: string;
  balance?: number;
  description?: string;
}

export interface IMetaPagination {
  currentPage: number;
  perPage: number;
  total: number;
  totalPages: number;
}
