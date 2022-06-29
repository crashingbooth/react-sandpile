import React, { useState, useEffect, useContext, useRef } from 'react';
import {conductorContext} from '../Providers/conductor';
import SizePickers from './SizePickers';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';

const Options = (props) => {
  const { showNumbers, setShowNumbers, period, occupancy, dim, setDimAndReset } = useContext(conductorContext);
  const [sizeEditing, setSizeEditing] = useState(false);
  const localDim = useRef();
  const options = Array.from({length: 20}, (x, i) => i + 3);
  const changeValue = (action) => {
    setShowNumbers(!showNumbers);
  }

  useEffect(() => {
    if (localDim.current !== dim) {
      localDim.current = dim;
  }
  },[dim])

  const editClicked = () => {
    if (sizeEditing) {
      setDimAndReset(dim)
      setSizeEditing(false)
    } else {
      setSizeEditing(true)
    }
  }

  const setHeight = e => {
    localDim.current.height = e.value;
  }

  const setWidth = e => {
    localDim.current.width = e.value;
  }

  return (
    <>
      <div className="section">
        <div className="options">
          <div className="Options__stale-action">
            <div>
              <input type="checkbox" checked={showNumbers} onChange={changeValue} /><label> show numbers </label>
            </div>
            <p>{occupancy && `grains: ${occupancy.gridTotal} - ${(parseFloat(occupancy.ratio) * 100).toFixed(2)}%`}</p>
            <p>{`period: ${period}`}</p>
          </div>
          <button onClick={editClicked}>{sizeEditing ? "restart" : "edit dimensions"}</button>
          {!sizeEditing && <div><p>{`height: ${dim.height}`}</p><p>{`width: ${dim.width}`}</p></div>}
          {sizeEditing && <div><Dropdown options={options} onChange={setHeight} value={dim.height} placeholder="Height" />
          <Dropdown options={options} onChange={setWidth} value={dim.width} placeholder="Width" /></div>}
        </div>
      </div>
    </>
  )
}

export default Options;
