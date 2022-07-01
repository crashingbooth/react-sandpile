import React, { useState, useEffect, useContext } from 'react';
import {conductorContext} from '../Providers/conductor';
import Popover from './Popover';
import SamplePicker from './SamplePicker';

const SampleSelector = ({rowNum}) => {
  const { grid } = useContext(conductorContext);


  return (
    <div className="sample-selector">
      <Popover content={<SamplePicker rowNum={rowNum}/>} trigger="hover">
        <button><i class="far fa-file-audio icon"></i></button>
      </Popover>
    </div>
  )
}

export default SampleSelector;
