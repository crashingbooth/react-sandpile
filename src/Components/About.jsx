import React, { useState, useEffect, useContext } from 'react';
import { conductorContext } from '../Providers/conductor';

const About = ({}) => {
  const { } = useContext(conductorContext);
  const [showAbout, setShowAbout] = useState(false);

  const handleClick = () => {
    setShowAbout(!showAbout);
  }

  const text1 = "The Abelian Sandpile Model is a cellular automaton that can be said to roughly model toppling piles of sand. It works like this: You have a grid of cells each of which can safely hold one, two, or three grains of sand. But if you add a fourth grain, the cell 'topples' and its four grain are disbursed to its four cardinal neighbours.";

  const text2 = "To see how this plays out, either tap 'play' for it to add grains automatically to the centre of the grid, or set the 'when still' setting to 'wait', then press 'play' and manually add grains by tapping on the centre cell if you want to control the pace."

  const text3 = "After the fourth grain is added to the centre, it topples to its neighbours, and the neighbours will each have one grain. If that centre cell topples three more times, its neighbours will each have four grains, and they themselves will topple to their neighbours. As these four all share the centre cell as a neighbour, it will once again have four grains, and will topple again. This is a 'cascade'."

  const text4 = "Since our grids are finite (the right-side neighbour of the rightmost cell is on the far left), grids with enough grains in them will cascade in infinite loops with sometimes surprisingly long periods."

  const text5 = "Each row in the grid is associated with a set of audio samples, and each cell is mapped to a sample from that set. When a cell topples, that sample is triggered. You can change the sample set by tapping the icon to the right of each grid row."

  return (
    <>
      <h2>Abelian Sandpiles</h2>
      <p>{text1}</p>
      <p>{text2}</p>
      <p>{text3}</p>
      <p>{text4}</p>
      <p>{text5}</p>
    </>
  )
}

export default About;
