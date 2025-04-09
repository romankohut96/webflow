'use strict';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import X2JS from 'x2js';

import './styles.css';

import VehicleDropdowns from './VehicleDropdowns/VehicleDropdowns.jsx';
import Body from './Body/Body.jsx';

const e = React.createElement;

function PartSearchModal() {
  const [year, setYear] = useState();
  const [make, setMake] = useState();
  const [model, setModel] = useState();
  const [parts, setParts] = useState([]);
  // const [partsCount, setPartsCount] = useState();

  return (
    <div className="">
      <header className="bg-blue-500 p-8 flex flex-row">
        <div className="logo">this is a logo</div>
        <form className="bg-blue-300 p-4 flex flex-1 flex-col">
          <VehicleDropdowns
            year={year}
            setYear={setYear}
            make={make}
            setMake={setMake}
            model={model}
            setModel={setModel}
          />
        </form>
      </header>
      <Body parts={parts} />
    </div>
  );
}

const domContainer = document.querySelector('#part-search-modal');
const root = ReactDOM.createRoot(domContainer);
root.render(e(PartSearchModal));
