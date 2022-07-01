import React, { useState, useEffect, useContext } from 'react';
import SampleSelector from './SampleSelector';
import {conductorContext} from '../Providers/conductor';

const SampleSelectorColumn = () => {
  const { grid } = useContext(conductorContext);

  return (
    <div className="sample-selector__wrapper">
      {grid && grid.map((row, i) => <SampleSelector key={i} rowNum={i}/>)}
    </div>
  )
}

export default SampleSelectorColumn;
