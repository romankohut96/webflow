import React, { useEffect } from "react";
import _, { filter } from 'lodash'

import Filter from "./Filter/Filter.jsx";

export default function Filters(props) {

  const {
    parts,
    filterSelections,
    filters,
    setFilters,
    setUpdated
  } = props

  const filtersToInclude = ['supplier', 'location', 'part_type', 'brand']
  const filterKeys = Object.keys(filterSelections)
  
  useEffect(() => updateFilters(), [parts, filterSelections])

  const updateFilters = () => {
    const newFilters = parts.reduce((newFilters, part) => {

      // if no filters selected, tally all attributes
      const attributes = filterSelections 
        ? getAttributesToTally(part)
        : _.intersection(Object.keys(part), filtersToInclude)

      newFilters = tallyPart(attributes, part, newFilters)

      return newFilters
    },{})

    setFilters(newFilters)
  }

  const tallyPart = (attributes, part, newFilters) => {
    attributes.forEach(attribute => {
      const partAttributeValue = part[attribute]
      const selected = isSelected(attribute, partAttributeValue)
      
      newFilters[attribute] ||= {}
      newFilters[attribute][partAttributeValue] ||= newTally(selected)
      newFilters[attribute][partAttributeValue].tally ++
    })

    return newFilters
  }

  const getAttributesToTally = part => {
    const numActiveFilters = filterKeys.length
    const filtersMatched = getMatchingFilters(part)
    
    let attributesToTally = []
    
    // tally all attributes if part matches all filters
    if (filtersMatched.length == numActiveFilters) {
      attributesToTally = Object.keys(part)
      // tally selected attribute if one active filter
    } else if (numActiveFilters == 1) {
      attributesToTally = filterKeys
      // tally unmatched attributes if part matches and 2 filters selected
    } else if (filtersMatched.length > 0 && numActiveFilters == 2) {
      attributesToTally = _.difference(filterKeys, filtersMatched)
    } 
    
    // include only whitelisted filters
    return _.intersection(attributesToTally, filtersToInclude)
  }

  const getMatchingFilters = part => {
    return filterKeys.reduce((matches, filterKey) => {
      const partValue = part[filterKey]
      const filterOptions = filterSelections[filterKey]
        
      if (filterOptions.includes(partValue)) {
        matches.push(filterKey)
      }
      
      return matches
    }, [])
  }

  const isSelected = (attribute, partAttributeValue) => {
    return filterSelections[attribute]
      ? filterSelections[attribute].includes(partAttributeValue)
      : false
  }

  const newTally = (selected=false) => ({selected: selected, tally: 0})

  return (
    <div className='p-4 flex flex-col bg-slate-50 min-w-[350px]'>
      {
        Object.keys(filters).map(filter => (
          <Filter 
            filterName={filter} 
            filterData={filters[filter]} 
            setUpdated={setUpdated} />
        ))
      }
    </div>
  )
}