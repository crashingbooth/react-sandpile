import React, { useState, useEffect, useContext } from 'react';
import { conductorContext } from '../Providers/conductor';

const Pile = ({numChips, coord, gridWidth}) => {
  const { increment, showNumbers } = useContext(conductorContext);
  const getChipState = numChips => {
    if (numChips === 1) {
      return "pile--one-chip";
    } else if (numChips === 2) {
      return "pile--two-chips";
    } else if (numChips === 3) {
      return "pile--three-chips";
    } else if (numChips === 4) {
      return "pile--four-chips";
    } else if (numChips >= 5) {
      return "pile--topple";
    } else {
      return "pile--no-chips"
    }
  }

  const sendIncrement = () => {
    increment(coord)
  }

  return (
    <button className={`pile ${getChipState(numChips)} ${gridWidth > 15 ? "pile--reduced" : ""}`} onClick={sendIncrement}>{showNumbers && numChips > 0 ? numChips : ""}</button>
  )
}

export default Pile;
