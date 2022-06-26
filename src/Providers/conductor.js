import React, { useState, useContext, createContext, useEffect, useRef } from "react";
import * as Tone from "tone";
import { emptyGrid, randomGrid, applyDifferenceGrid, getDifferenceGrid, getToppledPiles } from "../sandpile"
import { sampler, pool } from "../audioUrls";

export const conductorContext = createContext();

const Conductor = (props) => {
  const playing = useRef();
  const [bpm, setBpm] = useState(100);
  const nextGridRef = useRef();
  const topples = useRef();
  const rowToLibrary = useRef();
  const [grid, setGrid] = useState();

  const dim = {height: 5, width:3};

  useEffect(() => {
    reset()
    rowToLibrary.current = Array(dim.height).fill("").map((e,i) => Object.keys(pool)[i % Object.keys(pool).length]);
  },[])

  const prepareNext = () => {
    const toppledPiles = [...topples.current];
    if (toppledPiles.length === 0) {
      const coord = randCoord(dim)
      nextGridRef.current[coord.y][coord.x] += 1;
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

    setGrid(copy2d(nextGridRef.current));
    prepareNext()
  }, "8n").start(0);

    Tone.Transport.start();
    playing.current = true;
  };

  const stop = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    playing.current = false;
  }

  const reset = () => {
    nextGridRef.current = randomGrid(dim);
    setGrid(nextGridRef.current);
    topples.current = [];
  }

  const changeBPM = (newTempo) => {
    Tone.Transport.bpm.value = newTempo;
    setBpm(newTempo)
  }

  const copy2d = matrix => {
    return matrix.map(row => [...row]);
  }

  const randCoord = dim => {
    return {x: Math.floor(Math.random() * dim.width),y: Math.floor(Math.random() * dim.height)}
  }


  const provideData = {
    grid,
    play,
    stop,
    reset
  };

  return (
    <conductorContext.Provider value={provideData}>
      {props.children}
    </conductorContext.Provider>
  );
}

export default Conductor;
