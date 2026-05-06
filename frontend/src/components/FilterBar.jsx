import React, { useState, useEffect } from 'react';
import { getCities, monthOrder } from '../data/unified.data';
import './FilterBar.css';

function FilterBar({ onFilterChange, defaultCity = 'São Paulo', defaultMonth = 'Jun', showMonthFilter = true }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  useEffect(() => {
    setCities(getCities());
  }, []);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ city: selectedCity, month: showMonthFilter ? selectedMonth : null });
    }
  }, [selectedCity, selectedMonth, onFilterChange, showMonthFilter]);

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Cidade:</label>
        <select
          className="filter-select"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}, {city.country}
            </option>
          ))}
        </select>
      </div>

      {showMonthFilter && (
        <div className="filter-group">
          <label className="filter-label">Mês:</label>
          <select
            className="filter-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {monthOrder.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
