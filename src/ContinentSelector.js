import React from "react";

const ContinentSelector = ({ onContinentChange, selectedContinents }) => {
  const continents = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"];

  const handleCheckboxChange = (continent) => {
    // Toggle the selected continent
    if (selectedContinents.includes(continent)) {
      onContinentChange(selectedContinents.filter(c => c !== continent));
    } else {
      onContinentChange([...selectedContinents, continent]);
    }
  };

  return (
    <div className="ContinentSelector">
      {continents.map((continent) => (
        <label key={continent}>
          <input
            type="checkbox"
            value={continent}
            checked={selectedContinents.includes(continent)}
            onChange={() => {
              handleCheckboxChange(continent);
            }}
          />
          {continent}
        </label>
      ))}
    </div>
  );
};

export default ContinentSelector;
