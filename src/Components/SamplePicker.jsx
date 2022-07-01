import React, { useState, useEffect, useContext } from 'react';
import {conductorContext} from '../Providers/conductor';

const SamplePicker = ({rowNum}) => {
  const { grid, rowToLibrary, changeRowToLibrary, poolList } = useContext(conductorContext);
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    setSelectedValue(rowToLibrary.current[rowNum])
  },[rowToLibrary.current]);

  console.log("picker", rowNum, rowToLibrary && rowToLibrary.current[rowNum]);

  const setSample = (e) => {
    setSelectedValue(e.target.value)
    changeRowToLibrary(Number(rowNum), e.target.value)
  }

  return (
    <div className="sample-picker">
      {rowToLibrary.current && poolList.current.map((val, i) =>
        <div className="sample-picker__row" onChange={setSample} key={i}>
            <input type="radio"
            value={val}
            name={`samplePicker-${rowNum}`}
            checked={selectedValue === val}/>
          <label>{val}</label>
        </div>)}
    </div>
  )
}

export default SamplePicker;
