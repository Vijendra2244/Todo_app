import React from 'react';

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul>
      {pageNumbers.map(number => (
        <li key={number}>
          <button
            onClick={() => goToPage(number)}
            disabled={currentPage === number}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
