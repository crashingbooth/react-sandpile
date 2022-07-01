import React, { useState, useEffect, useContext } from 'react';
import Grid from './Grid';
import SampleSelectorColumn from './SampleSelectorColumn';
import {conductorContext} from '../Providers/conductor';

const GridWrapper = () => {
  const { grid } = useContext(conductorContext);

  return (
    <div className="grid-wrapper">
      <Grid/>
      <SampleSelectorColumn/>
    </div>
  )
}

export default GridWrapper;
