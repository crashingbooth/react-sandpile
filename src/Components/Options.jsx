import React, { useState, useEffect, useContext } from 'react';
import {conductorContext} from '../Providers/conductor';

const Options = (props) => {
  const { showNumbers, setShowNumbers, period, occupancy } = useContext(conductorContext);
  const changeValue = (action) => {
    setShowNumbers(!showNumbers);
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
        </div>
      </div>
    </>
  )
}

export default Options;
