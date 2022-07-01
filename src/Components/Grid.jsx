import React, { useState, useEffect, useContext } from 'react';
import {conductorContext} from '../Providers/conductor';
import PileRow from "./PileRow";

const Grid = () => {
  const { grid } = useContext(conductorContext);

  return (
    <div className="grid">
      {grid && grid.map((row, i) => (<PileRow row={row} key={i} rowNum={i}/>)) }
    </div>
  )
}

export default Grid;
