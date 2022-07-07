import React, { useState, useEffect, useContext } from 'react';
import { conductorContext } from '../Providers/conductor';

const About = ({}) => {
  const { } = useContext(conductorContext);
  const [showAbout, setShowAbout] = useState(false);
  const [page, setPage] = useState(0);

  const handleClick = () => {
    setShowAbout(!showAbout);
  }

  const showBack = () => {
    return page > 0;
  }

  const showNext = () => {
    return page < texts.length - 1;
  }

  const handlePageChange = (direction) => {
    let newPage = page;
    newPage += direction === 'back' ? -1 : 1;
    if (newPage < 0 || newPage > texts.length -1) { return }
    setPage(newPage);
  }

  const turnBack = () => {
    handlePageChange('back');
  }

  const turnForward = () => {
    handlePageChange('forward');
  }

  const text1 = "The Abelian Sandpile Model is a cellular automaton that can be said to roughly model toppling piles of sand. It works like this: You have a grid of cells each of which can safely hold one, two, or three grains of sand. But if you add a fourth grain, the cell 'topples' and its four grain are disbursed to its four cardinal neighbours.";

  const text2 = "To see how this plays out, either tap 'play' to automatically add grains to the centre of the grid. If you want to control the pace, set the 'when stable' behaviour to 'wait', then press 'play' to start the system."

  const text3 = "After the fourth grain is added to the centre, it topples to its neighbours, and the neighbours will each have one grain. If that centre cell topples three more times (bringing the total grains to 16), its neighbours will each have four grains, and they themselves will topple to their neighbours. As these four all share the centre cell as a neighbour, it will once again have four grains, and will topple again. This is a 'cascade'."

  const text4 = "Since our grids are finite (the right-side neighbour of the rightmost cell is on the far left), grids with enough grains in them will cascade in infinite loops with sometimes surprisingly long periods."

  const text5 = "Each row in the grid is associated with a set of audio samples, and each cell is mapped to a sample from that set. When a cell topples, that sample is triggered. You can change the sample set by tapping the icon to the right of each grid row."

  const texts = [text1,text2, text3, text4, text5];
  const links = [
    {topic: "Abelian Sandpiles", link: "https://en.wikipedia.org/wiki/Abelian_sandpile_model"},
    {topic: "Cellular Automaton", link: "https://en.wikipedia.org/wiki/Cellular_automaton"}
  ]

  return (
    <>
      <div className="about-section__button">
        <button onClick={turnBack}> {showBack() && <i className="fas fa-chevron-left"> </i>}</button>
      </div>
      <div className="about-section__text">
        <p>{texts[page]}</p>
        <div className="about-section__links">
          {page === 0 && links.map(link => <a href={link.link} key={link.topic}>{link.topic}</a>)}
        </div>
      </div>
      <div className="about-section__button">
        <button onClick={turnForward}>  {showNext() && <i className="fas fa-chevron-right"> </i>}</button>
      </div>
    </>
  )
}

export default About;
