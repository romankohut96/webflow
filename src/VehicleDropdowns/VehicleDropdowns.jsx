import React from 'react';
import _ from 'lodash';
import X2JS from 'x2js';

import Dropdown from './Dropdown/Dropdown.jsx';

export default function VehicleDropdowns(props) {
  const x2js = new X2JS();

  const getYears = (setOptions) => {
    const yearLookup =
      'https://www.showmethepartsdb2.com/bin/ShowMeconnect.exe?lookup=year&id=BOLD4WDAPI2182';

    return fetch(yearLookup)
      .then((response) => response.text())
      .then((str) => x2js.xml2js(str))
      .then((data) => setOptions(data.ShowMeTheParts_Year.year));
  };

  const getMakes = (setOptions) => {
    if (!props.year) return;

    const makeLookup = `https://www.showmethepartsdb2.com/bin/ShowMeconnect.exe?lookup=make&year=${props.year?.id}&id=BOLD4WDAPI2182`;

    return fetch(makeLookup)
      .then((response) => response.text())
      .then((str) => x2js.xml2js(str))
      .then((data) => setOptions(data.ShowMeTheParts_Make.make));
  };

  const getModels = (setOptions) => {
    if (!props.year || !props.make) return;

    const makeLookup = `https://www.showmethepartsdb2.com/bin/ShowMeconnect.exe?lookup=model&year=${props.year?.id}&make=${props.make?.id}&id=BOLD4WDAPI2182`;

    return fetch(makeLookup)
      .then((response) => response.text())
      .then((str) => x2js.xml2js(str))
      .then((data) => setOptions(data.ShowMeTheParts_Model.model));
  };

  return (
    <div className="flex relative">
      <Dropdown
        id="year-dropdown"
        label="year"
        getOptions={getYears}
        selected={props.year}
        setSelection={props.setYear}
        peers={[props.make, props.model]}
      />
      <Dropdown
        id="make-dropdown"
        label="make"
        disabled={!props.year}
        getOptions={getMakes}
        selected={props.make}
        setSelection={props.setMake}
        peers={[props.year, props.model]}
      />
      <Dropdown
        id="model-dropdown"
        label="model"
        disabled={!props.make}
        getOptions={getModels}
        selected={props.model}
        setSelection={props.setModel}
        peers={[props.year, props.make]}
      />
    </div>
  );
}
