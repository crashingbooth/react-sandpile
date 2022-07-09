import React, { useState, useEffect, useContext } from 'react';
import Pile from "./Pile"

const PileRow = ({row, rowNum, gridWidth }) => {
  console.log("pilerow", gridWidth);
  return (
    <>
    <div className="grid__pile-row">
      {row.map((val, i) => (<Pile numChips={val} key={`${rowNum}-${i}`} coord={{x:i, y:rowNum}}
        gridWidth={gridWidth}/>)) }
    </div>
    </>
  )
}

export default PileRow;
