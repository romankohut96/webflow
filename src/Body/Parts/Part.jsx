import React from "react";

export default function Part(props) {

  return (
    <div className='p-4 flex flex-col justify-between border-2 border-slate-200'>
      <div className='flex flex-col'>
        <img className='mb-4 object-contain m-h-48 self-center' src={props.part.image} />
        <h6 className='text-xs font-semibold'>{props.part.brand}</h6>
        <h5 className='mb-4 text-lg font-medium'>{props.part.part_type}</h5>
        <p>location: {props.part.location}</p>
        <p>supplier: {props.part.supplier}</p>
      </div>
      { props.part.comment && 
        <p className='mt-2 text-xs text-slate-500'>
          comment: {props.part.comment}
        </p>
      }
    </div>
  )
}

