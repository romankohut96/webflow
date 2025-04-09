import React from 'react';

export default function FilterOption(props) {

  return (
    <button 
      className={props.selected
        ? 'px-2 py-1 text-sm w-full flex flex-row justify-between items-center hover:bg-sky-100 bg-sky-300'
        : 'px-2 py-1 text-sm w-full flex flex-row justify-between items-center hover:bg-sky-100'
      }
      onClick={() => props.toggleSelected(props.name)}>
      <h6 className='mr-4 text-left'>{props.name.toUpperCase()}</h6>
      <h5 className='text-slate-500'>{props.tally}</h5>
    </button>
  )
}