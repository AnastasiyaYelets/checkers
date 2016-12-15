export const prepareBoard = () => {
  const red = [];
  const blue = [];
  const yellow = [];

  for (let i = 0; i < 64; i++) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    ((x + y) % 2 === 1 && (y < 3) ) ? red.push([x, y]) : null;
    ((x + y) % 2 === 1 && (y > 4) ) ? blue.push([x, y]) : null;
  }

  return {
    red, blue, yellow,
    whoTurn:'userred',
    select:false,
    stepArrayRed :[],
    stepArrayBlue:[],
    alertList:[],
  }
}
