import React, { useState, useEffect, useContext, useRef } from 'react';
import {conductorContext} from '../Providers/conductor';
// import SizePickers from './SizePickers';
// import 'react-dropdown/style.css';
// import Dropdown from 'react-dropdown';

const Options = (props) => {
  const { showNumbers, setShowNumbers, period, occupancy, dim, setDimAndReset } = useContext(conductorContext);
  const [sizeEditing, setSizeEditing] = useState(false);
  const [localDim, setLocalDim] = useState();
  const options = Array.from({length: 20}, (x, i) => i + 3);
  const changeValue = (action) => {
    setShowNumbers(!showNumbers);
  }

  useEffect(() => {
    if (localDim !== dim) {
      setLocalDim(dim);
  }
  },[dim])

  const editClicked = () => {
    if (sizeEditing) {
      console.log("options", localDim);
      setDimAndReset(localDim)
      setSizeEditing(false)
    } else {
      setSizeEditing(true)
    }
  }

  const setHeight = e => {
    setLocalDim({...localDim, height: Number(e.target.value)})
  }

  const setWidth = e => {
    setLocalDim({...localDim, width: Number(e.target.value)})
  }

  return (
    <>
      <div className="section">
        <div className="options">
          <div className="options__basic options__section">
            <div>
              <input type="checkbox" checked={showNumbers} onChange={changeValue} /><label> show numbers </label>
            </div>
            <p>{occupancy && `grains: ${occupancy.gridTotal} - ${(parseFloat(occupancy.ratio) * 100).toFixed(2)}%`}</p>
            <p>{`period: ${period}`}</p>
          </div>
          <div className="options__size-picker options__section">
            <button onClick={editClicked}>{sizeEditing ? "restart" : "edit dimensions"}</button>
            {!sizeEditing && <div><p>{`height: ${dim.height}`}</p><p>{`width: ${dim.width}`}</p></div>}
            {sizeEditing && <div>
              <div className="options__picker-row">
                  <label>height: </label>
                  <input className="options__input" onChange={setHeight} value={localDim.height} placeholder="height" />
                </div>
                <div className="options__picker-row">
                <label>width:</label>
                  <input className="options__input" onChange={setWidth} value={localDim.width} placeholder="width" />
                </div>
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Options;
