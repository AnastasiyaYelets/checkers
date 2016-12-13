import { isInArr, isInArrIndex } from './is-in'

const newX = (chX) => {
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][chX];
};

const canKick2 = (mult1, mult2, inverseColor, X, Y, oldState) => {
  return (
    isInArr( X+(1*mult1) , Y+(1*mult2),oldState[inverseColor])
    && !(isInArr( X+(2*mult1) , Y+(2*mult2), oldState.blue)
    && !(isInArr( X+(2*mult1) , Y+(2*mult2), oldState.red)
    && X+(2*mult1)<8
    && Y+(2*mult2))<8
    && X+(2*mult1)>0
    && Y+(2*mult2))>0
  )
};

const canKick = (X,Y,color, oldState) => {
  const inverseColor = color === 'red' ? 'blue' : 'red';
  const multiplArray = [[1,1],[-1,-1],[1,-1],[-1,1]];

  return (
    multiplArray.some((el) => canKick2(el[0], el[1], inverseColor, X, Y, oldState))
  )
};

const checkDirection = (mult1, mult2, X, Y, oldState) => {
  return (
   !(isInArr( X+(mult1) , Y+(mult2), oldState.blue))
    && !(isInArr( X+(mult1) , Y+(mult2), oldState.red))
  )
};

const canMakeStep = (X,Y, oldState) => {
  const multiplArray = [[1,1],[-1,-1],[1,-1],[-1,1]];

  return (
    multiplArray.some((el) => checkDirection(el[0], el[1], X, Y, oldState))
  )
};

  // This method calculates can circle make step or kick other circle.
const canDoSomehting = ( X, Y, color, oldState) => {
  return (
    canKick(X,Y,color, oldState) || canMakeStep(X,Y, oldState)
  )
};

const processTurnBlue = (X, Y, oldState, newState) => {
  const isRedInside = isInArr( X , Y, oldState.red);
  const redIndex = isInArrIndex( X, Y, oldState.red );
  const isBlueInside = isInArr( X , Y, oldState.blue);
  const blueIndex = isInArrIndex( X, Y, oldState.blue);
  const canDoSomehtingRed = canDoSomehting( X, Y, 'red', oldState);
  const canDoSomehtingBlue = canDoSomehting( X, Y, 'blue', oldState);
  const oneStep = (Math.abs(newState.x0-X) === 1 && Math.abs(newState.y0-Y) === 1);
  const oneKick = (Math.abs(newState.x0-X) === 2 && Math.abs(newState.y0-Y) === 2);
  const isBlack = ( (X + Y) % 2 === 1 );
  let isMadeKick = false;

  if (!oldState.select){
    if ((isBlueInside) && (canDoSomehtingBlue)) {
      newState.select = true;
        const arrYel = newState.yellow;
        arrYel.push([ X, Y]);
        newState.yellow = arrYel;
      newState.index = blueIndex;
      newState.x0 = X;
      newState.y0 = Y;
    }
  } else if( oldState.select && !(isMadeKick)) {
      if (isBlack && !(isBlueInside) && !(isRedInside)){

        console.log("is black" + isBlack);
        if (oneStep) {
          console.log("is one step " + oneStep);
          const arrBlue = newState.blue;
          arrBlue.splice(oldState.index, 1, [ X, Y]);
          newState.blue = arrBlue;

          const StepArrayBlue = newState.steparrayblue;
          const elStepArrayBlue = `${newX(newState.x0)}${newState.y0+1} =>${newX(X)}${Y+1};`;
          StepArrayBlue.push(elStepArrayBlue);
          newState.steparrayblue = StepArrayBlue;


          newState.select = false;

          let arrYel = newState.yellow;
          arrYel=[];
          newState.yellow = arrYel;

          newState.whoTurn = 'userred';


        }

        if (oneKick) {
          console.log("is one kick " + oneKick);
          if (canKick(newState.x0, newState.y0,'blue', oldState)) {
            console.log("is can cick 1" + canKick(newState.x0, newState.y0,'blue', oldState));


            const xDel = Math.abs(newState.x0+X)/2;
            const yDel = Math.abs(newState.y0+Y)/2;
            if (isInArr( xDel , yDel, oldState.red)){
              const delIndex = isInArrIndex( xDel, yDel, oldState.red);
              const arrRed = newState.red;
              arrRed.splice(delIndex,1);
              newState.red = arrRed;


              const StepArrayBlue = newState.steparrayblue;
              const elStepArrayBlue = `${newX(newState.x0)}${newState.y0+1} =>${newX(X)}${Y+1};`;
              StepArrayBlue.push(elStepArrayBlue);
              newState.steparrayblue = StepArrayBlue;


              newState.x0 = X;
              newState.y0 = Y;

              const arrBlue = newState.blue;
              arrBlue.splice(oldState.index, 1, [ X, Y]);
              newState.blue = arrBlue;

              if (canKick(newState.x0, newState.y0,'blue', oldState)) {
                isMadeKick = true;
                console.log("isMadeKick " + isMadeKick);
              } else {
                newState.select = false;

                let arrYel = oldState.yellow;
                arrYel=[];
                newState.yellow = arrYel;

                newState.whoTurn = 'userred';
              }
            }
          }
        }
      }
    }
};

const processTurnRed = (X, Y, oldState, newState) => {
  const isRedInside = isInArr( X , Y, oldState.red);
  const redIndex = isInArrIndex( X, Y, oldState.red );
  const isBlueInside = isInArr( X , Y, oldState.blue);
  const blueIndex = isInArrIndex( X, Y, oldState.blue);
  const canDoSomehtingRed = canDoSomehting( X, Y, 'red', oldState);
  const canDoSomehtingBlue = canDoSomehting( X, Y, 'blue', oldState);
  const oneStep = (Math.abs(newState.x0-X) === 1 && Math.abs(newState.y0-Y) === 1);
  const oneKick = (Math.abs(newState.x0-X) === 2 && Math.abs(newState.y0-Y) === 2);
  const isBlack = ( (X + Y) % 2 === 1 );
  let isMadeKick = false;

  if (!oldState.select){
    if ((isRedInside) && (canDoSomehtingRed)) {
      newState.select = true;

      const arrYel = newState.yellow;
      arrYel.push([ X, Y]);
      newState.yellow = arrYel;

      newState.index = redIndex;
      newState.x0 = X;
      newState.y0 = Y;
    }
  } else if( oldState.select && !(isMadeKick)) {
      if (isBlack && !(isBlueInside) && !(isRedInside)){

        console.log("is black " + isBlack);
        if (oneStep) {
          console.log("is one step " + oneStep);
          const arrRed = newState.red;
          arrRed.splice(oldState.index, 1, [ X, Y]);
          newState.red = arrRed;

          const StepArrayRed = newState.steparrayred;
          const elStepArrayRed = `${newX(newState.x0)}${newState.y0+1} =>${newX(X)}${Y+1};`;
          StepArrayRed.push(elStepArrayRed);
          newState.steparrayred = StepArrayRed;


          newState.select = false;

          let arrYel = newState.yellow;
          arrYel=[];
          newState.yellow = arrYel;


          newState.whoTurn = 'userblue';


        }

         if (oneKick) {
          console.log("is one kick " + oneKick);


          if (canKick(newState.x0, newState.y0,'red', oldState)) {
            console.log("is can cick 1" + canKick(newState.x0, newState.y0,'red', oldState));


            const xDel = Math.abs(newState.x0+X)/2;
            const yDel = Math.abs(newState.y0+Y)/2;
            if (isInArr( xDel , yDel, oldState.blue)){
              const delIndex = isInArrIndex( xDel, yDel, oldState.blue);

              const arrBlue = newState.blue;
              arrBlue.splice(delIndex,1);
              newState.blue = arrBlue;

              const StepArrayRed = newState.steparrayred;
              const elStepArrayRed = `${newX(newState.x0)}${newState.y0+1} =>${newX(X)}${Y+1};`;
              StepArrayRed.push(elStepArrayRed);
              newState.steparrayred = StepArrayRed;

              newState.x0 = X;
              newState.y0 = Y;

              const arrRed = newState.red;
              arrRed.splice(oldState.index, 1, [ X, Y]);
              newState.red = arrRed;

              if (canKick(newState.x0, newState.y0,'red', oldState)) {
                isMadeKick = true;
                console.log("isMadeKick " + isMadeKick);
              } else {
                newState.select = false;

                let arrYel = newState.yellow;
                arrYel=[];
                newState.yellow = arrYel;


                newState.whoTurn = 'userblue';
              }
            }
          }
        }
      }
    }
};

const processTurn = (color, X, Y, oldState, newState) => {
  const isRedInside = isInArr( X , Y, oldState.red);
  const redIndex = isInArrIndex( X, Y, oldState.red );
  const isBlueInside = isInArr( X , Y, oldState.blue);
  const blueIndex = isInArrIndex( X, Y, oldState.blue);
  const canDoSomehtingRed = canDoSomehting( X, Y, 'red', oldState);
  const canDoSomehtingBlue = canDoSomehting( X, Y, 'blue', oldState);
  const oneStep = (Math.abs(newState.x0-X) === 1 && Math.abs(newState.y0-Y) === 1);
  const oneKick = (Math.abs(newState.x0-X) === 2 && Math.abs(newState.y0-Y) === 2);
  const isBlack = ( (X + Y) % 2 === 1 );
  let isMadeKick = false;


};

export const handleSquareClick = (X, Y, oldState) => {
     let newState = { ...oldState };

     if (oldState.whoTurn === 'userred'){
       processTurnRed(X, Y, oldState, newState)
     } else {
       processTurnBlue(X, Y, oldState, newState)
     }

    //  processTurn(oldState.whoTurn, X, Y, oldState, newState)

     return newState;
   }
