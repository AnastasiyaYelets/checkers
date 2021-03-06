import {isInArr, isInArrIndex} from './is-in'

const newX = (chX) => {
  return ['A','B','C','D','E','F','G','H'][chX];
};

const checkKickDirection = (mult1, mult2, inverseColor, X, Y, oldState) => {
  return (
    isInArr(X + (1 * mult1), Y + (1 * mult2), oldState[inverseColor])
    && !isInArr(X + (2 * mult1), Y + (2 * mult2), oldState.blue)
    && !isInArr(X + (2 * mult1), Y + (2 * mult2), oldState.red)
    && X + (2 * mult1) <= 7
    && Y + (2 * mult2) <= 7
    && X + (2 * mult1) >= 0
    && Y + (2 * mult2) >= 0)
  };

  const canKick = (X, Y, color, oldState) => {
    const inverseColor = inverse(color);
    const multiplArray = [
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1]
    ];

    return (multiplArray.some((el) => checkKickDirection(el[0], el[1], inverseColor, X, Y, oldState)))
  };

  const checkStepDirection = (mult1, mult2, X, Y, oldState) => {
    return (!(isInArr(X + (mult1), Y + (mult2), oldState.blue)) && !(isInArr(X + (mult1), Y + (mult2), oldState.red))
    && X +  (mult1) <= 7
    && Y + (mult2) <= 7
    && X + (mult1) >= 0
    && Y + (mult2) >= 0)
  };

  const canMakeStep = (X, Y, oldState) => {
    const multiplArray = [
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1]
    ];

    return (multiplArray.some((el) => checkStepDirection(el[0], el[1], X, Y, oldState)))
  };

  // This method calculates can circle make step or kick other circle.
  const canDoSomething = (X, Y, color, oldState) => {
    return (canKick(X, Y, color, oldState) || canMakeStep(X, Y, oldState))
  };

  const logSteps = (color, X, Y, newState) => {
    const StepArray = color === 'red' ? newState.stepArrayRed : newState.stepArrayBlue;
    const elemStepArray = `${newX(newState.x0)}${newState.y0 + 1} =>${newX(X)}${Y + 1};`;
    StepArray.push(elemStepArray);
    if (color === 'red') {
      newState.stepArrayRed = StepArray
    } else {
      newState.stepArrayBlue = StepArray
    }
      };

  const changeXY = (color, X, Y, newState) => {
    const arr = newState[color];
    arr.splice(newState.index, 1, [X, Y]);
    newState[color] = arr;
  };
  let arrYel = [];

  const changeSelection = (elemArrCoord, newState) => {
    if (!(elemArrCoord === [])) {
      arrYel = [elemArrCoord];
    } else {
      arrYel = [];
    }
    newState.yellow = arrYel;
    console.log(newState.yellow);
  };
  const inverse = (color) => { return color === 'red' ? 'blue' : 'red';}
  // const chooseChecker = () => {}
  let canMakeAnotherKick = false;
  let alertList=[];


  const someCheckerCanKick = (color, newState) => {
    const StepArray = color === 'red' ? newState.red : newState.blue;

    return (StepArray.some((el) => canKick(el[0], el[1], color, newState)))
      };




  const processTurn = (color, X, Y, oldState, newState) => {
    const inverseColor = inverse(color);
    const isInside = isInArr(X, Y, oldState[color]);
    const Index = isInArrIndex(X, Y, oldState[color]);
    const isInverseInside = isInArr(X, Y, oldState[inverseColor]);
    const InverseIndex = isInArrIndex(X, Y, oldState[inverseColor]);
    const isCanDoSomething = canDoSomething(X, Y, color, oldState);
    const oneStep = (Math.abs(newState.x0 - X) === 1 && Math.abs(newState.y0 - Y) === 1);
    const oneKick = (Math.abs(newState.x0 - X) === 2 && Math.abs(newState.y0 - Y) === 2);
    const isBlack = ((X + Y) % 2 === 1);
    const isRightSquare = isBlack && !isInside && !isInverseInside;

    let isSomeCheckerCanKick = someCheckerCanKick(color, newState);
    const isCanKick = canKick(X, Y, color, newState);
    newState.alertList=[];



    if (!newState.select && isInside && isCanDoSomething&& !isSomeCheckerCanKick) {
      newState.select = true;
      changeSelection([X, Y], newState);
      newState.index = Index;
      newState.x0 = X;
      newState.y0 = Y;
    }else if (!newState.select && isInside && isCanDoSomething && isSomeCheckerCanKick && isCanKick) {
        newState.select = true;
        changeSelection([X, Y], newState);
        newState.index = Index;
        newState.x0 = X;
        newState.y0 = Y;



    } else if (newState.select && oneStep && !(canMakeAnotherKick) && isRightSquare && !isSomeCheckerCanKick) {
      changeXY(color, X, Y, newState);
      logSteps(color, X, Y, newState);
      newState.select = false;
      // changeSelection([], newState);
      newState.whoTurn = color === 'red' ? 'userblue' : 'userred';

    } else if (newState.select && oneKick && !(canMakeAnotherKick) && isRightSquare) {
      const xDel = Math.abs(newState.x0 + X) / 2;
      const yDel = Math.abs(newState.y0 + Y) / 2;

      if (canKick(newState.x0, newState.y0, color, newState) && isInArr(xDel, yDel, oldState[inverseColor])) {
        const delIndex = isInArrIndex(xDel, yDel, newState[inverseColor]);
        const arrDel = newState[inverseColor];
        arrDel.splice(delIndex, 1);
        newState[inverseColor] = arrDel;
        logSteps(color, X, Y, newState);
        newState.x0 = X;
        newState.y0 = Y;
        changeXY(color, X, Y, newState);
        changeSelection([X,Y], newState);
        if (isCanKick) {
          canMakeAnotherKick = true;
        } else {
          canMakeAnotherKick = false;
          newState.select = false;
          changeSelection([], newState);
          newState.whoTurn = color === 'red'  ? 'userblue'  : 'userred';
          isSomeCheckerCanKick= false;
        }
      }
    } else if (newState.select && canMakeAnotherKick && isRightSquare && oneKick) {

      const xDel = Math.abs(newState.x0 + X) / 2;
      const yDel = Math.abs(newState.y0 + Y) / 2;

      if (canKick(newState.x0, newState.y0, color, newState) && isInArr(xDel, yDel, oldState[inverseColor])) {
        const delIndex = isInArrIndex(xDel, yDel, newState[inverseColor]);
        const arrDel = newState[inverseColor];
        arrDel.splice(delIndex, 1);
        newState[inverseColor] = arrDel;
        newState.x0 = X;
        newState.y0 = Y;
        logSteps(color, X, Y, newState);
        changeXY(color, X, Y, newState);

        if (isCanKick) {

          canMakeAnotherKick = true;
        } else {

          isSomeCheckerCanKick= false;
          canMakeAnotherKick = false;
          newState.select = false;
          changeSelection([], newState);
          newState.whoTurn = color === 'red' ? 'userblue' : 'userred';
        }
      }
    } else {

      const colorForAlert = newState.whoTurn === 'userred'? 'красных': 'синих';
      const colorForAlertInverse = newState.whoTurn === 'userred'? 'синих': 'красных';
      if (newState.select && isSomeCheckerCanKick&& isCanKick && oneStep) {
        alertList = [`Вы должны бить`]
      }
      if (!newState.select) {
        if (!isInside) {
          alertList = [`Выберите одну из ${colorForAlert} шашек, которая может сделать ход`]
        }if (!isCanDoSomething) {
          alertList = ["Эта шашка не может сделать ход"]
        }
      }
      if (!newState.select && isInside && isCanDoSomething && isSomeCheckerCanKick && !isCanKick) {
        alertList = [`Одна из ваших ${colorForAlert} шашек, может бить шашку противника. Вы должны бить`]
      }
      if (newState.select && !oneKick && !(canMakeAnotherKick) && isRightSquare) {
        alertList = [`Вы должны бить`]
      }
      if (newState.select && !isBlack){
        alertList=[ "Вы выбрали белую клетку. Так не по правилам, выберите черную" ]
      } if (newState.select && isInverseInside) {
        alertList=[`Вы выбрали клетку, занятую одной из ${colorForAlertInverse} шашек. Вы же понимаете, что сюда нельзя перенести одну из ${colorForAlert}` ]
      } if (newState.select && isInside) {
        alertList=[`Вы выбрали клетку, занятую одной из своих ${colorForAlert} шашек. Неужели вы хотите поместить их в одну клетку?` ]
      } if (newState.select && isRightSquare && !oneKick && !oneStep ){
        alertList=[ "Ваша шашка не может сделать этот ход. Шашка может ходить на 1 ход или бить шашку противника" ]
      }if (newState.select && canMakeAnotherKick &&  !oneKick) {
        alertList=[ "Выбранная вами шашка может бить еще раз за этот ход" ]
      }if (newState.select && canMakeAnotherKick && !isRightSquare) {
        alertList=[ "Вы же уже знаете, как бить по правилам. Покажите это всем прямо сейчас" ]
      }
      newState.alertList=alertList;
    }
  };
  export const handleSquareClick = (X, Y, oldState) => {
    let newState = {
      ...oldState
    };
    const color = newState.whoTurn === 'userred'? 'red': 'blue';
    processTurn(color, X, Y, oldState, newState)
    return newState;
  }
