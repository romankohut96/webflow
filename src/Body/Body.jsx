import React, { useEffect, useState, useRef } from "react";

import Parts from './Parts/Parts.jsx'
import Filters from './Filters/Filters.jsx'

export default function Body(props) {

  const [filters, setFilters] = useState({})
  const [updated, setUpdated] = useState(true)
  const [filterSelections, setFilterSelections] = useState({})
  const [filteredParts, setFilteredParts] = useState()
  const firstUpdate = useRef(true)

  useEffect(() => filter(), [updated])

  const parts = () => filteredParts ? filteredParts : props.parts

  const filter = () => {
    // prevents filter on first render
    if (firstUpdate.current) {
      firstUpdate.current = false
      return 
    }

    setFilterSelections(getActiveFilters())
    const filterNames = Object.keys(filterSelections)
    const filteredParts = filterNames.length != 0 
      ? filterParts(filterSelections, filterNames)
      : props.parts
    
    setFilteredParts(filteredParts)
    setUpdated(true)
  }

  const filterParts = (activeFilters, filterNames) => {
    // return filtered parts which...
    return props.parts.filter(part => {
      // match at least one option of every active filter
      return filterNames.reduce((doesMatchAll, filterName) => {
        if (doesMatchAll == false) return false
        
        const partValue = part[filterName]
        const filterSelections = activeFilters[filterName]
        
        if (!filterSelections.includes(partValue)) {
          doesMatchAll = false
        }
        
        return doesMatchAll
      }, true)
    })
  }

  const getActiveFilters = () => {
    const filterNames = Object.keys(filters)
    // return active filters with selected options
    return filterNames.reduce((activeFilters, filterName) => {
      const filter = filters[filterName]
      const filterOptions = Object.keys(filter)
      const selectedOptions = getSelectedOptions(filter, filterOptions)
      // add to active filters if any options selected
      if (selectedOptions.length != 0) {
        activeFilters[filterName] = selectedOptions
      }

      return activeFilters
    }, {})
  }

  const getSelectedOptions = (filter, options) => {
    // return array of selected option values
    return options.reduce((selected, option) => {
      if (filter[option].selected == true) {
        selected.push(option)
      }

      return selected
    }, [])
  }

  return (
    <section className="flex flex-row">
      <Filters 
        parts={props.parts} 
        filters={filters} 
        filterSelections={filterSelections} 
        setFilters={setFilters}
        updated={updated}
        setUpdated={setUpdated} />
      <div className='flex flex-col'>
        { parts().length != 0 &&
          <h4 className='p-4 pb-0 text-sm text-slate-500'>
            <span className='font-bold'>{parts().length} </span> 
            parts found
          </h4>
        }
        <Parts parts={parts()} />
      </div>
    </section>
    )
}