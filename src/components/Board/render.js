import React, { Component, PropTypes } from 'react';
import Square from '../square';
import Circle from '../circle';
import { isInArr } from './is-in';


export const renderSquare = (i, state, handleSquareClick) => {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const black = (x + y) % 2 === 1;
  const isSelected = isInArr(x,y,state.yellow)? true : false;

  const circlesRed = isInArr(x,y,state.red)  ?
  <Circle color isSelected={isSelected}  /> :
  null;

  const circlesBlue =isInArr(x,y,state.blue) ?
  <Circle color={false} isSelected={isSelected} /> :
  null;


  return (
    <div key={i}
      onClick={() => handleSquareClick(x, y)}>
      <Square black={black}>
        {circlesRed}
        {circlesBlue}
      </Square>
    </div>
  );
}

export const renderLogger = (state) => {

let turn = state.whoTurn === "userred" ? 'красных' : 'синих';
  return (
    <div className ="logger">

      <h2> Ход:   {turn} </h2>
      <div className ="loggerStep" >
        <h4> Красных шашек: {state.red.length}</h4>
        <div> Ходы красных:  {state.stepArrayRed.map(value => <li key={state.stepArrayRed.indexOf(value)}> {value} </li> )}</div>
      </div>

      <div className ="loggerStep" >
        <h4> Синих шашек: {state.blue.length}</h4>
        <div> Ходы синих:  {state.stepArrayBlue.map(value => <li key={state.stepArrayBlue.indexOf(value)}> {value} </li> )}</div>
      </div>
    </div>
  )
}
export const renderSquares = (state, handleSquareClick) => {
  const squares = [];

  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, state, handleSquareClick));
  }

  return (
    <div className ="effect1">
     <div className ="renderSquare" >

      {squares}
    </div>  </div>
  )
}
  export const renderAlert = (state) => {
    return (
      <div className ="logger">
        <h4>  {state.alertList.map(value =><ul> <li key={state.alertList.indexOf(value)}> {value} </li></ul> )}</h4>
      </div>
    )
  }
