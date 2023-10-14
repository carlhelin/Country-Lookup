import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table.js";
import SearchBar from "./SearchBar.js";
import PageNumber from "./pageNumber.js";
import PageSize from "./pageSize.js";
import ContinentSelector from "./ContinentSelector.js";

// Converts an array of continents to their corresponding two-letter continent abbreviations
function transformListToString(inputList) {
  const continentAbbreviations = {
    'Africa': 'AF',
    'Antarctica': 'AN',
    'Asia': 'AS',
    'Europe': 'EU',
    'North America': 'NA',
    'Oceania': 'OC',
    'South America': 'SA'
  };

  return inputList
    .filter(continent => continentAbbreviations[continent])
    .sort()
    .map(continent => continentAbbreviations[continent]);
}

function App() {
  /* Create state:
   - apiData: A list containing dictionaries of countries fetched from an API.
   - searchQuery: The search query parameter that should be added to the API request's "&search=".
   - pageNumber: The page number that is currently requested and displayed.
   - pageSize: The number of items to display per page.
   - column: The column by which the data should be sorted.
   - sortOrder: The sorting order (e.g., "ascending" or "descending").
   - pageCount: The total number of pages available based on the data and page size.
   - selectedContinents: An array containing the continents selected as filter criteria.
  */

  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [pageNumber, setPageNumber] = useState(1); 
  const [pageSize, setPageSize] = useState(10); 
  const [column, setColumn] = useState(""); 
  const [sortOrder, setSortOrder] = useState(""); 
  const [pageCount, setPageCount] = useState(10);
  const [selectedContinents, setSelectedContinents] = useState([]);

  const handleSearch = (searchTerm) => {
    searchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
    setPageNumber(1);
    setSearchQuery(searchTerm);
  }

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  }

  const handleSizeChange = (newSize) => {
    setPageNumber(1);
    setPageSize(newSize);
  }

  const handleSort = (column, sortOrder) => {
    setApiData({ ...apiData, order: `${column}:${sortOrder}` });
    setPageNumber(1);
    setColumn(column);
    setSortOrder(sortOrder);
  };

  // Update the selected continents based on the ContinentSelector
  const handleContinentChange = (continents) => {
    setPageNumber(1);
    setSelectedContinents(continents);
  };

  useEffect(() => {
    // All parameters are appended to this URL.
    let apiQuery = "https://dhis2-app-course.ifi.uio.no/api?";

    // If searchQuery isn't empty add &search=searchQuery to the API request.
    if (searchQuery) {
      apiQuery = apiQuery + "&search=" + searchQuery;
    }

    apiQuery = apiQuery + "&pageSize=" + pageSize;
    apiQuery = apiQuery + "&page=" + pageNumber;

    if (column && sortOrder) {
      apiQuery = apiQuery + `&order=${column}:${sortOrder}`;
    }

    if (selectedContinents && selectedContinents.length >= 1) {
      const selectedCountriesString = transformListToString(selectedContinents);
      const continentString = selectedCountriesString.join(',');
      apiQuery = apiQuery + `&ContinentCode=${continentString}`;
    }
    
    fetch(apiQuery)
      .then((results) => results.json())
      .then((data) => {
        // Then add response to state.
        setApiData(data);
        setPageCount(data.pager.pageCount);
        setColumn(column);
        setSortOrder(sortOrder);
        
      });
  }, [searchQuery, pageNumber, pageSize, sortOrder, column, pageCount, selectedContinents]);

  return (
    <div className="App">
      <h1>Country lookup</h1>
      <SearchBar data= {apiData} onSearch={handleSearch} pageCount={pageCount} />
      <ContinentSelector onContinentChange={handleContinentChange} selectedContinents={selectedContinents} />
      <Table apiData={apiData} handleSort={handleSort} />
      <PageNumber onPageChange={handlePageChange} pageNumber={pageNumber} pageCount={pageCount} />
      <PageSize onSizeChange={handleSizeChange} pageNumber={pageNumber} page={pageCount} />
    </div>
  );
}

export default App;
