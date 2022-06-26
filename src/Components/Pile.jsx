import React, { useState, useEffect, useContext } from 'react';
import {positionContext} from '../Providers/conductor';

const Pile = ({numChips}) => {
  const getChipState = numChips => {
    if (numChips === 1) {
      return "pile--one-chip";
    } else if (numChips === 2) {
      return "pile--two-chips";
    } else if (numChips === 3) {
      return "pile--three-chips";
    } else if (numChips >= 4) {
      return "pile--topple";
    } else {
      return "pile--no-chips"
    }
  }
  return (
    <div className={`pile ${getChipState(numChips)}`}></div>
  )
}

export default Pile;
