import { Link } from 'react-router-dom';
import './searchbar.scss';
import { useState } from 'react';

const SearchBar = () => {
  const types = [0, 1];
  const [query, setQuery] = useState({
    type: '',
    city: '',
    minPrice: '',
    maxPrice: '',
  });
  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const createQueryString = (query) => {
    // Loại bỏ các key có giá trị rỗng hoặc null
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([_, value]) => value !== '' && value !== null
      )
    );
    return new URLSearchParams(filteredQuery).toString();
  };

  return (
    <div className='searchBar'>
      <div className='type'>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? 'active' : ''}
          >
            {type === 0 ? 'Buy' : 'Rent'}
          </button>
        ))}
      </div>
      <form>
        <input
          type='text'
          name='city'
          placeholder='City Location'
          onChange={handleChange}
        />
        <input
          type='number'
          name='minPrice'
          min={0}
          max={10000000}
          placeholder='Min Price'
          onChange={handleChange}
        />
        <input
          type='number'
          name='maxPrice'
          min={0}
          max={10000000}
          placeholder='Max Price'
          onChange={handleChange}
        />
        <Link to={`/list?${createQueryString(query)}`}>
          <button>
            <img src='/search.png' alt='' />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SearchBar;
