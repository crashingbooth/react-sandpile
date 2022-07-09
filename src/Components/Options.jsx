import React, { useState, useEffect, useContext, useRef } from 'react';
import {conductorContext} from '../Providers/conductor';


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

      setDimAndReset(fix(localDim));
      setSizeEditing(false);
    } else {
      setSizeEditing(true);
    }
  }

  const minim = 3;
  const maxim = 21;

  const setHeight = e => {
    const val = Number(e.target.value);
    if (val) {
      setLocalDim({...localDim, height: val});
    }
  }

  const setWidth = e => {
    const val = Number(e.target.value);
    if (val) {
      setLocalDim({...localDim, width: val});
    }
  }

  const clamp = (value, min, max) => {
    if (value < min) { value = min }
    if (value > max) { value = max }
    return value;
  }

  const fix = (obj) => {
    Object.entries(obj).forEach(([key, val], i) => {
      obj[key] = clamp(val, minim, maxim);
    });
    return obj;
  }


  return (
    <>
      <div className="section options">
        <div className="options__basic options__section">
          <div className="options__row options__row--checkbox">
            <input className="options__checkbox" type="checkbox" checked={showNumbers} onChange={changeValue} /><label> show numbers </label>
          </div>
          <p>{occupancy && `grains: ${occupancy.gridTotal} - ${(parseFloat(occupancy.ratio) * 100).toFixed(2)}%`}</p>
          <p>{`period: ${period}`}</p>
        </div>
        <div className="options__size-picker options__section">
          <button onClick={editClicked}>{sizeEditing ? "restart" : "edit dimensions"}</button>
          {!sizeEditing && <div>
              <div className="options__row options__row--text-input"><p>height: </p><p>{dim.height}</p></div>
              <div className="options__row options__row--text-input"><p>width: </p><p>{dim.width}</p></div>
              </div>}
          {sizeEditing && <div>
            <div className="options__row options__row--text-input">
                <label>height: </label>
                <input className="options__input" onChange={setHeight} value={localDim.height} placeholder="height" />
              </div>
              <div className="options__row options__row--text-input">
              <label>width:</label>
                <input className="options__input" onChange={setWidth} value={localDim.width} placeholder="width" />
              </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default Options;
