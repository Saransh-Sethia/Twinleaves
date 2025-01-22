import React from 'react';
import "./SearchFilter.css"

const SearchFilter = ({handleSearchTerm, searchTerm, setSearchTerm}) => {
  return (
    <div className='search-filter'>
      <h3 className='search-heading'>Find your Favorite</h3>
      <input 
      type="text"
      placeholder='Search'
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
      className='filter'
      />
    </div>
  )
}

export default SearchFilter
