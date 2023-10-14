import React, { useState } from 'react';

function Table(props) {

  const [sortOrder, setSortOrder] = useState({
    Country: '',
    Population: '',
    PopulationGrowth: '',
    Continent: '',
  });

  const onSortChange = (column) => {
    // Map column names to their sorting order keys
    const sortOrderKeys = {
      Country: 'Country',
      Population: 'Population',
      PopulationGrowth: 'PopulationGrowth',
      Continent: 'Continent',
    };
  
    // Toggle the sorting order for the specified column
    const currentOrder = sortOrder[sortOrderKeys[column]];
    const newOrder = currentOrder === 'ASC' ? 'DESC' : 'ASC';
  
    // Create a new sorting order object and update the specified column
    const updatedSortOrder = {
      ...sortOrder,
      [sortOrderKeys[column]]: newOrder,
    };
  
    // Update the state with the new sorting order
    setSortOrder(updatedSortOrder);

    // Clear sorting order for all other columns
    for (const col in updatedSortOrder) {
      if (col !== column) {
        updatedSortOrder[col] = null;
      }
    }
  
    // Call the onSortChange callback to send sorting information to the parent component
    props.handleSort(column, newOrder);
  };

  if (!props.apiData.results) {
    // If the API request isn't completed return "loading...""
    return <p>Loading...</p>;
  } else {
    // Extract the data from the API response
    let data = props.apiData.results;


    return (
      <table className="tabel">
        <thead>
          <tr>
            <th>
              <button onClick={() => onSortChange('Country')}>
                <div>
                  Country
                  {sortOrder.Country === 'ASC' && ' ▲'}
                  {sortOrder.Country === 'DESC' && ' ▼'}
                </div>
              </button>
            </th>
            <th>
              <button onClick={() => onSortChange('Population')}>
                <div>
                  Population
                  {sortOrder.Population === 'ASC' && ' ▲'}
                  {sortOrder.Population === 'DESC' && ' ▼'}
                </div>
              </button>
            </th>
            <th>
              <button onClick={() => onSortChange('PopulationGrowth')}>
                <div>
                  Population Growth
                  {sortOrder.PopulationGrowth === 'ASC' && ' ▲'}
                  {sortOrder.PopulationGrowth === 'DESC' && ' ▼'}
                </div>
              </button>
            </th>
            <th>
              <button onClick={() => onSortChange('Continent')}>
                <div>
                  Continent
                  {sortOrder.Continent === 'ASC' && ' ▲'}
                  {sortOrder.Continent === 'DESC' && ' ▼'}
                </div>
              </button>
             </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="country-column">{row.Country}</td>
              <td>{row.Population.toLocaleString()}</td>
              <td className="population-growth-cell">{row.PopulationGrowth}</td>
              <td className="continent-cell">{row.Continent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
