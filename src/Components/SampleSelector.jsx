import React, { useState, useEffect, useContext } from 'react';
import {conductorContext} from '../Providers/conductor';

const SampleSelector = () => {
  const { grid } = useContext(conductorContext);

  return (
    <div className="sample-selector">
      <p>*</p>
    </div>
  )
}

export default SampleSelector;
