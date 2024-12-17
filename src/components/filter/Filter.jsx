import { useSearchParams } from 'react-router-dom';
import './filter.scss';
import { useEffect, useState } from 'react';

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
  const [errors, setErrors] = useState({
    minPrice: '',
    maxPrice: '',
    bedroom: '',
  });

  const validateNegative = (name, value) => {
    return value !== '' && parseInt(value) < 0
      ? 'Value cannot be negative'
      : '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';

    // Reusable negative validation for minPrice, maxPrice, and bedroom
    if (name === 'minPrice' || name === 'maxPrice' || name === 'bedroom') {
      errorMessage = validateNegative(name, value);
    }

    // Update query state and errors
    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleFilter = () => {
    const params = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value.trim() !== '')
    );
    setSearchParams(params);
  };

  const validateForm = () => {
    // Ensure that there are no errors before submitting
    return !Object.values(errors).some((error) => error !== '');
  };

  useEffect(() => {
    console.log(query);
  }, [query]);

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
        <button onClick={handleFilter} disabled={!validateForm()}>
          <img src='/search.png' alt='' />
        </button>
      </div>
      <div className='error' style={{ color: 'red' }}>
        {(errors.minPrice || errors.maxPrice || errors.bedroom) && (
          <span className='error'>Value cannot be negative</span>
        )}
      </div>
    </div>
  );
};

export default Filter;
