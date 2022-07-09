import React, { useState, useEffect, useContext } from 'react';
import {conductorContext} from '../Providers/conductor';

const Transport = (props) => {
  const { playPause, isPlaying, reset, setStaleAction, staleAction } = useContext(conductorContext);

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
        <div className="transport__grouping">
          <div className="transport--button-row"><button onClick={playPause}>{`${isPlaying ? "Stop" : "Play"}`}</button></div>
          <div className="transport__stale-action">
            <h3>when stable:</h3>
            <div onChange={selectStaleAction} className="transport__radio-group">
              {Object.keys(actions).map(action =>
                (<div className="transport__stale-action--row">
                  <label>{actions[action]}</label>
                  <input type="radio"
                        value={action}
                        key={action}
                        checked={action === staleAction}
                        name="staticAction" />
                </div>)
              )}
            </div>
          </div>
        </div>
        <div className="transport__grouping">
          <div className="transport--button-row"><button onClick={cleanReset}>Clear</button></div>
          <div className="transport--button-row"><button onClick={randomReset}>Random</button>
        </div>
        </div>
      </div>
    </>
  )
}

export default Transport;
