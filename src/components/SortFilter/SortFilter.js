import React from 'react';
import "./SortFilter.css"

const SortFilter = ({sorting, setSorting, handleSortModelChange}) => {
  return (
    <div className='sort-filter'>
        <h2><label htmlFor='sort-select' className='sort-label'>Sort by Price</label></h2>
        <select id="sort-select" className="sort-select" onChange={(e)=>handleSortModelChange([{field:"mrp.mrp", sort:e.target.value}])}>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
        </select>
    </div>
  )
}

export default SortFilter
