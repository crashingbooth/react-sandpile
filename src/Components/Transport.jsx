import React, { useState, useEffect, useContext } from 'react';
import {conductorContext} from '../Providers/conductor';

const Transport = (props) => {
  const { playPause, isPlaying, reset, randomReset, setStaleAction } = useContext(conductorContext);

  const selectStaleAction = (action) => {
    setStaleAction(action.target.value);
  }

  return (
    <>
      <div className="transport section">
        <button onClick={playPause}>{`${isPlaying ? "Stop" : "Play"}`}</button>
        <button onClick={reset}>Reset</button>
        <button onClick={randomReset}>Random</button>
        <div className="transport__stale-action">
          <h3>when still:</h3>
          <div onChange={selectStaleAction} className="transport__radio-group">
            <input type="radio" value="wait" name="staticAction"  /> <label>wait </label>
            <input type="radio" value="random" name="staticAction" defaultChecked/> <label>add random </label>
            <input type="radio" value="centre" name="staticAction" /> <label>add center </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Transport;
