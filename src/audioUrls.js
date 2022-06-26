import * as Tone from "tone";

const resourceBaseUrl = "https://raw.githubusercontent.com/crashingbooth/simple-percussion/main/"

const resourceRecipe =
  [{ name: "lo", numFiles: 6},
  // { name: "mid", numFiles: 4},
  // { name: "hi",  numFiles: 6},
  { name: "feel", numFiles: 6},
  // { name: "gam1", numFiles: 7},
  { name: "cbgam1", numFiles: 5},
  // { name: "cbgam2", numFiles: 5},
  { name: "coffee", numFiles: 12},
  { name: "morefol", numFiles: 10},
];
const noteList = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const createResources = () => {
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  let builtResources = {};
  resourceRecipe.forEach((item, octave) => {
    const sampleList = Array.from(new Array(item.numFiles), (x, i) => ({note: noteList[i] + octave, name: `${item.name}/${zeroPad(i+1,3)}.wav` }));
    builtResources[item.name] = sampleList;
  });
  return builtResources;
}

const resources = createResources();
const createSamplerWithResources = () => {
  let result = {};
  Object.values(resources).forEach(section => {
    section.forEach((sample) => {
      result[sample.note] = sample.name;
    });
  });

  const vol = new Tone.Volume(-12).toDestination();
  // const reverb = new Tone.Reverb(0.5).connect(vol);

  const samp =  new Tone.Sampler({
    urls: result,
    baseUrl: resourceBaseUrl
  });
  samp.connect(vol);
  return samp;
}

const createNotePools = () => {
  let result = {};
  Object.keys(resources).forEach(sectionName => {
    result[sectionName] = resources[sectionName].map(i => i.note);
  });
  return result;
}

const sampler = createSamplerWithResources();
const pool = createNotePools();
const libraryNames = Object.keys(resources);



export { sampler, pool, libraryNames };
