import React, { useState, useEffect, useContext } from 'react';
import Pile from "./Pile"

const PileRow = ({row, rowNum }) => {
  return (
    <>
    <div className="grid__pile-row">
      {row.map((val, i) => (<Pile numChips={val} key={`${rowNum}-${i}`}/>)) }
    </div>
    </>
  )
}

export default PileRow;
