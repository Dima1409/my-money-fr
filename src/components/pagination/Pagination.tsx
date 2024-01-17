import { useState } from "react";
import { PaginationContainer, PageButton } from "./Pagination.styled";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer>
      {Array.from({ length: totalPages }).map((_, index) => (
        <PageButton
          key={`page-${index + 1}`}
          onClick={() => paginate(index + 1)}
          $isCurrent={currentPage === index + 1}
        >
          {index + 1}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
