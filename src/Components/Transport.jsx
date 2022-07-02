import React, { useState, useEffect, useContext } from 'react';
import {conductorContext} from '../Providers/conductor';

const Transport = (props) => {
  const { playPause, isPlaying, reset, setStaleAction, staleAction } = useContext(conductorContext);
  console.log(staleAction);

  const selectStaleAction = (action) => {
    setStaleAction(action.target.value);
  }

  const actions = {wait: "wait", random: "add random", centre: "add centre"};

  const cleanReset = () => {
    reset("clean");
  }

  const randomReset = () => {
    reset("random");
  }

  return (
    <>
      <div className="transport section">
        <button onClick={playPause}>{`${isPlaying ? "Stop" : "Play"}`}</button>
        <button onClick={cleanReset}>Reset</button>
        <button onClick={randomReset}>Random</button>
        <div className="transport__stale-action">
          <h3>when still:</h3>
          <div onChange={selectStaleAction} className="transport__radio-group">
            {Object.keys(actions).map(action =>
              (<div ><input type="radio"
                      value={action}
                      checked={action === staleAction}
                      name="staticAction" />
               <label>{actions[action]}</label> </div>)
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Transport;
