import React, { useState } from 'react';

import { Combobox } from '@headlessui/react'

export default function MainQuerySearch(props) {
  const [options, setOptions] = useState([]);

  const getOptions = (query) => {
    query = query.replace(/\s/g, '%20');

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=41ecc174e82b6b1f94905705134b107a&language=en-US&query=${query}&page=1&include_adult=false`)
      .then((response) => response.json())
      .then((data) => setOptions(data.results.slice(0,6)));
  };



  return (
    <Combobox 
      value={props.selected?.title} 
      onChange={selected => props.setSelection(selected)}>
      <Combobox.Input 
        className='p-2 flex flex-1'
        onChange={e => getOptions(e.target.value)} />
      <Combobox.Options className='py-2 flex flex-1 flex-row'>
        { options.map(option => (
          <Combobox.Option 
            className='mr-2 p-2 bg-slate-100'
            key={option.id} 
            value={option}>
            {option.title}
          </Combobox.Option>
          )) 
        }
      </Combobox.Options>
    </Combobox>
  )
}