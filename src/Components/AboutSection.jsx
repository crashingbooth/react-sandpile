import React, { useState, useEffect, useContext } from 'react';
import About from './About';
import { conductorContext } from '../Providers/conductor';

const AboutSection = ({}) => {
  const { enactDemoSettings } = useContext(conductorContext);
  const [showAbout, setShowAbout] = useState(false);

  const handleClick = () => {
    setShowAbout(true);
    enactDemoSettings();
  }

  return (
    <>
      <div className={`section about-section ${showAbout ? "about-section--expanded" : ""}`} onClick={handleClick}>
        {!showAbout && <div><p>What is happening here?</p></div>}
        {showAbout && <About/>}
      </div>
    </>
  )
}

export default AboutSection;
