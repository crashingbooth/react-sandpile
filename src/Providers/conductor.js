import React, { useState, useContext, createContext, useEffect, useRef } from "react";
import * as Tone from "tone";
import { emptyGrid, randomGrid, applyDifferenceGrid, getDifferenceGrid, getToppledPiles, getCapacity } from "../sandpile"
import { sampler, pool } from "../audioUrls";

export const conductorContext = createContext();

const Conductor = (props) => {
  const playing = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(60);
  const nextGridRef = useRef();
  const topples = useRef();
  const rowToLibrary = useRef();
  const poolList = useRef()
  const staleActionRef = useRef();
  const [staleAction, setStaleActionState] = useState('random');
  const [grid, setGrid] = useState();
  const [showNumbers, setShowNumbers] = useState(true);
  const occupancyRef = useRef();
  const [occupancy, setOccupancy] = useState();

  const stepRef = useRef();
  const historyRef = useRef({});
  const [period, setPeriod] = useState("n/a");
  const observingRef = useRef();

  const [dim, setDim] = useState({height: 3, width:13}); // 3y x 15x is great

  useEffect(() => {
    reset()
    poolList.current = Object.keys(pool);
    setStaleAction(staleAction);
  },[dim])

  const prepareNext = () => {
    const toppledPiles = [...topples.current];
    if (toppledPiles.length === 0) {
      performStaleAction(dim);
    } else {
      const diffGrid = getDifferenceGrid(toppledPiles, dim);
      nextGridRef.current = applyDifferenceGrid(nextGridRef.current, diffGrid, dim);
      topples.current = getToppledPiles(nextGridRef.current);
    }
  }

  const performStaleAction = () => {
    if (staleActionRef.current === 'wait') {
      topples.current = getToppledPiles(nextGridRef.current);
      return;
    }

    let coord;
    if (staleActionRef.current === 'random') {
      coord = randCoord(dim);
    } else if (staleActionRef.current === 'centre') {
      coord = {x: Math.floor(dim.width/2), y: Math.floor(dim.height/2) };
    }
    nextGridRef.current[coord.y][coord.x] += 1;
    topples.current = getToppledPiles(nextGridRef.current);
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
      setOccupancy(getCapacity(nextGridRef.current));
      prepareNext();
      detectLoop();
  }, "8n").start(0);

    Tone.Transport.start();
    playing.current = true;
  };

  const stop = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    playing.current = false;
    setIsPlaying(false);
  }

  const nextSequence = () => {
    detectLoop()
  }

  const detectLoop = () => {
    const now = JSON.stringify(copy2d(nextGridRef.current));

    if (observingRef.current) {
      const periodStep = historyRef.current[now];
      if (periodStep && topples.current.length > 0) {
        setPeriod(stepRef.current - periodStep);
        observingRef.current = false;
      }
    }
    historyRef.current[JSON.stringify(copy2d(nextGridRef.current))] = stepRef.current;
    stepRef.current += 1;
  }

  const reset = (resetType) => {
    nextGridRef.current = resetType === 'random' ? randomGrid(dim) : emptyGrid(dim);
    rowToLibrary.current = Array(dim.height).fill("").map((e,i) => Object.keys(pool)[i % Object.keys(pool).length]);
    setGrid(nextGridRef.current);
    topples.current = [];
    observationReset();
  }

  const observationReset = () => {
    stepRef.current = 0;
    historyRef.current = {};
    observingRef.current = true;
    setPeriod("n/a");
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

  const increment = coords => {
    nextGridRef.current[coords.y][coords.x] += 1;
    console.log(coords, nextGridRef.current[coords.y][coords.x] );
    setGrid(copy2d(nextGridRef.current));
    observationReset();
  }

  const setStaleAction = action => {
    staleActionRef.current = action;
    setStaleActionState(action);
  }

  const playPause = () => {
    if (playing.current)  {
      stop();
    } else {
      play();
    }
    setIsPlaying(playing.current);
  }

  const setDimAndReset = newDim => {
    setDim(newDim);
    stop()
    reset();
  }

  const changeRowToLibrary = (rowNum, newValue) => {
    rowToLibrary.current[rowNum] = newValue;
  }

  const enactDemoSettings = () => {
    setStaleAction('centre');
    setDimAndReset({width: 7, height: 5});
  }


  const provideData = {
    grid,
    playPause,
    isPlaying,
    increment,
    occupancy,
    period,
    reset,
    setStaleAction,
    staleActionRef,
    staleAction,
    showNumbers,
    setShowNumbers,
    rowToLibrary,
    poolList,
    changeRowToLibrary,
    dim, setDimAndReset,
    enactDemoSettings
  };

  return (
    <conductorContext.Provider value={provideData}>
      {props.children}
    </conductorContext.Provider>
  );
}

export default Conductor;
