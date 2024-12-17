import { useSearchParams } from 'react-router-dom';
import './filter.scss';
import { useState } from 'react';

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get('type') || '',
    city: searchParams.get('city') || '',
    property: searchParams.get('property') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedroom: searchParams.get('bedroom') || '',
  });
  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };
  const handleFilter = () => {
    const params = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value.trim() !== '')
    );
    setSearchParams(params);
  };

  return (
    <div className='filter'>
      <h1>
        Search results for <b>{query.city}</b>
      </h1>
      <div className='top'>
        <div className='item'>
          <label htmlFor='city'>Location</label>
          <input
            type='text'
            id='city'
            name='city'
            placeholder='City Location'
            defaultValue={query.city}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='bottom'>
        <div className='item'>
          <label htmlFor='type'>Type</label>
          <select
            name='type'
            defaultValue={query.type}
            onChange={handleChange}
            id='type'
          >
            <option value=''>any</option>
            <option value='0'>Buy</option>
            <option value='1'>Rent</option>
          </select>
        </div>
        <div className='item'>
          <label htmlFor='property'>Property</label>
          <select
            name='property'
            id='property'
            defaultValue={query.property}
            onChange={handleChange}
          >
            <option value=''>any</option>
            <option value='0'>Apartment</option>
            <option value='1'>House</option>
            <option value='2'>Condo</option>
            <option value='3'>Land</option>
          </select>
        </div>
        <div className='item'>
          <label htmlFor='minPrice'>Min Price</label>
          <input
            type='number'
            id='minPrice'
            name='minPrice'
            placeholder='any'
            defaultValue={query.minPrice}
            onChange={handleChange}
          />
        </div>
        <div className='item'>
          <label htmlFor='maxPrice'>Max Price</label>
          <input
            type='text'
            id='maxPrice'
            name='maxPrice'
            placeholder='any'
            defaultValue={query.maxPrice}
            onChange={handleChange}
          />
        </div>
        <div className='item'>
          <label htmlFor='bedroom'>Bedroom</label>
          <input
            type='text'
            id='bedroom'
            name='bedroom'
            placeholder='any'
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <button onClick={handleFilter}>
          <img src='/search.png' alt='' />
        </button>
      </div>
    </div>
  );
};

export default Filter;
