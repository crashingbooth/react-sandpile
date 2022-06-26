import React, { useState, useEffect, useContext } from 'react';
import {conductorContext} from '../Providers/conductor';

const Transport = (props) => {
  const { play, stop } = useContext(conductorContext);
  return (
    <>
      <div className="transport">
        <button onClick={play}>Play</button>
        <button onClick={stop}>stop</button>
      </div>
    </>
  )
}

export default Transport;
