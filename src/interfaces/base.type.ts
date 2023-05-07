export interface HttpResponse<Data = null> {
  statusCode: number;
  message?: string;
  details?: string;
  data?: Data;
}

export interface PaginationQuery {
  pageNum?: number;
  pageSize?: number;
}
