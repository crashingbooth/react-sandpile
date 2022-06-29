import React, { useState, useEffect, useContext } from 'react';
import Dropdown from 'react-dropdown';
import {conductorContext} from '../Providers/conductor';
import 'react-dropdown/style.css';

const SizePickers = () => {
    const { dim, setDimAndReset } = useContext(conductorContext);
  const options = Array.from({length: 20}, (x, i) => i + 3);;
  const defaultHeight = options[0];
  const defaultWidth = options[13];

  const setHeight = e => {
    setDimAndReset({width: dim.width, height: e.value});
  }

  const setWidth = e => {
    setDimAndReset({width: dim.width, height: e.value});
  }

  return (
    <div>
      <Dropdown options={options} onChange={setHeight} value={defaultHeight} placeholder="Height" />
      <Dropdown options={options} onChange={setWidth} value={defaultWidth} placeholder="Width" />
    </div>
  )
}

export default SizePickers;
