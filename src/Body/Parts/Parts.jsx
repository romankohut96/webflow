import React from "react";

import Part from './Part.jsx'
export default function Parts(props) {

  return (
    <div className="p-4 grid grid-cols-5 gap-4 ">
      { props.parts.map(part => (
        <Part part={part} />
      ))}
    </div>
  )
}

