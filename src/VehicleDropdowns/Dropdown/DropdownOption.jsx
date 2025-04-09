import React, { Fragment } from 'react';

import { Combobox } from '@headlessui/react'

export default function DropdownOption(props) {


  return(
    <Combobox.Option key={props.option.id} value={props.option} as={Fragment}>
      { ({ active }) => (
        <li
          className={active ? 'p-1 bg-blue-300 text-white' : 'p-1 bg-white text-black'}>
          {props.option.data || props.option.id}
        </li>
      ) }
    </Combobox.Option>
  );
}