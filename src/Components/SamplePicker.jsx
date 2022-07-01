import React, { useState, useEffect, useContext } from 'react';
import {conductorContext} from '../Providers/conductor';

const SamplePicker = ({rowNum}) => {
  const { grid, rowToLibrary, changeRowToLibrary, poolList } = useContext(conductorContext);

  console.log(poolList && poolList.current);
  console.log(rowNum, rowToLibrary && rowToLibrary.current[rowNum]);
  const setSample = (e) => {
    console.log(e.target.value, poolList.current);
    changeRowToLibrary(Number(rowNum), e.target.value)
  }

  return (
    <div className="sample-picker">
      {rowToLibrary.current && poolList.current.map((val, i) =>
        <div className="sample-picker__row" onChange={setSample} key={i}>
          <input type="radio" value={val} name="samplePicker" defaultChecked={rowToLibrary.current[rowNum] === poolList.current[i]}/>
          <label>{val}</label>
        </div>)}
    </div>
  )
}

export default SamplePicker;
