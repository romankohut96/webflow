import React from 'react';

import FilterOption from './FilterOption.jsx';

export default function Filter(props) {

  const toggleSelected = (attribute) => {
    const currentValue = props.filterData[attribute].selected

    props.filterData[attribute].selected = !currentValue
    props.setUpdated(false)
  }

  return (
    <div className='flex flex-col items-start'>
      <h5 className='mt-4 mb-1 text-lg font-semibold'>{props.filterName}</h5>
      { Object.keys(props.filterData).map(attribute => (
        <FilterOption 
          name={attribute}
          tally={props.filterData[attribute].tally}
          selected={props.filterData[attribute].selected}
          toggleSelected={toggleSelected} />
      ))}
    </div>
  )
}