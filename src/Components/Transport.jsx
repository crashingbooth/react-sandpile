import React, { useState, useEffect, useContext } from 'react';
import {conductorContext} from '../Providers/conductor';

const Transport = (props) => {
  const { play, stop, reset } = useContext(conductorContext);
  return (
    <>
      <div className="transport">
        <button onClick={play}>Play</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  )
}

export default Transport;
