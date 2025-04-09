import React, { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react'

import DropdownOption from './DropdownOption.jsx';

export default function Dropdown(props) {
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState('')

  useEffect(() => {
    props.getOptions(setOptions)
  })
  

  const filteredOptions = options.filter(option => {
        return option.data 
          ? option.data.toLowerCase().includes(query.toLowerCase())
          : option.id.toLowerCase().includes(query.toLowerCase())
      }).slice(0,20)

  return (
    <Combobox
      value={props.selected?.data || props.selected?.id}
      disabled={props.disabled}
      onChange={selected => props.setSelection(selected)}>
      <div className='flex flex-col pr-4 pb-2'>
        <Combobox.Label>
          { props.label }
        </Combobox.Label>
        <Combobox.Input 
          className='bg-white p-2' 
          onChange={e => setQuery(e.target.value)} />
          <div className='relative'>
            <Combobox.Options className='bg-white absolute w-full'>
              { filteredOptions.map(option => {
                return <DropdownOption option={option} />
              })}
            </Combobox.Options>
          </div>
      </div>
    </Combobox>
  )
}