import React, { useState, useContext, createContext, useEffect, useRef } from "react";
import * as Tone from "tone";
import { emptyGrid, applyDifferenceGrid, getDifferenceGrid, getToppledPiles } from "../sandpile"
import { sampler, pool } from "../audioUrls";

export const conductorContext = createContext();

const Conductor = (props) => {
  const playing = useRef();
  const [bpm, setBpm] = useState(140);
  const gridRef = useRef();
  const nextGridRef = useRef();
  const topples = useRef();
  const rowToLibrary = useRef();
  const [grid, setGrid] = useState();

  const dim = {height: 5, width:6};

  useEffect(() => {
    console.log(pool);
    gridRef.current = emptyGrid(dim);
    topples.current = [];
    rowToLibrary.current = Array(dim.height).fill("").map((e,i) => Object.keys(pool)[i]);
    setGrid(gridRef.current);
  },[])

  const prepareNext = () => {
    const toppledPiles = [...topples.current];
    if (toppledPiles.length === 0) {
      nextGridRef.current = grid.copy2d();
      nextGridRef.current[2][2] += 2;
      topples.current = getToppledPiles(nextGridRef.current);
    } else {
      const diffGrid = getDifferenceGrid(toppledPiles, dim);
      nextGridRef.current = applyDifferenceGrid(nextGridRef.current, diffGrid, dim);
      topples.current = getToppledPiles(nextGridRef.current);
    }
  }

  const safeTrigger = (coord, time) => {
    const library = rowToLibrary.current[coord.y];
    const sampleID = coord.x;
    let note = pool[library][sampleID % pool[library].length];
            sampler.triggerAttackRelease(note, "16n", time);
  }

  let loopA;
  const play = () => {
    if (playing.current) { return }
    Tone.start()
    loopA = new Tone.Loop((time) => {
      topples.current.forEach(coord => {
        safeTrigger(coord, time);
      });

    setGrid(nextGridRef.current.copy2d());
    prepareNext()
  }, "4n").start(0);

    Tone.Transport.start();
    playing.current = true;
  };

  const stop = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    playing.current = false;
  }

  const changeBPM = (newTempo) => {
    Tone.Transport.bpm.value = newTempo;
    setBpm(newTempo)
  }

  const copy2d = matrix => {
    return matrix.map(row => [...row]);
  }


  const provideData = {
    grid,
    play,
    stop
  };

  return (
    <conductorContext.Provider value={provideData}>
      {props.children}
    </conductorContext.Provider>
  );
}

export default Conductor;
