import React from "react";

function PageNumber(props) {
  const {pageNumber, pageCount, onPageChange} = props;

  const handlePreviousPage = () => {
    onPageChange(pageNumber - 1);
  };

  const handleNextPage = () => {
    onPageChange(pageNumber + 1);    
  };

  return (
    <div className="pageNumber">
      {pageNumber > 1 && (
        <button onClick={handlePreviousPage}>Previous</button>
      )}
      <span>Page {pageNumber}</span>
      {pageNumber < pageCount &&  (
        <button onClick={handleNextPage}>Next</button>
      )}
    </div>
  );
}

export default PageNumber;