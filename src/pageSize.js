function PageSize(props) {
  
  const handleSizeChange = (event) => {
    const selectedSize = parseInt(event.target.value);
    props.onSizeChange(selectedSize);
  };

  return (
    <div className="pageSize">
        <label htmlFor="resPerPage">Results per page:</label>
        <select
        name="resPerPage"
        id="resPerPage"
        onChange={handleSizeChange}
        value={props.PageSize}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
}

export default PageSize;