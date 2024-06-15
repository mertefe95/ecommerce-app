import { PaginationDto } from '../dto/pagination.dto';

export default function Pagination(query: PaginationDto) {
  const { pageNumber, paginationPerPage, skipPagination } = query ?? {};
  return !skipPagination
    ? {
        pagination: {
          skip: pageNumber * paginationPerPage - paginationPerPage,
          take: +paginationPerPage,
        },
      }
    : {};
}
