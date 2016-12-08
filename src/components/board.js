import React, { Component, PropTypes } from 'react';
import Square from './square';
import Circle from './circle';



export default class Board extends Component {

  constructor(){
    super(...arguments);
  }

  componentWillMount() {
    const red = [];
    const blue = [];
    for (let i = 0; i < 64; i++) {
      const x = i % 8;
      const y = Math.floor(i / 8);
      ((x + y) % 2 === 1 && (y < 3) ) ? red.push([x, y]) : null;
      ((x + y) % 2 === 1 && (y > 4) ) ? blue.push([x, y]) : null;
    }


    this.setState({red});
    this.setState({blue});
    this.setState({whoTurn:'userred'});
    this.setState({select:false});
    this.setState({steparrayred:[]});
    this.setState({steparrayblue:[]});
  }



    isInArr(arrx=0, arry=0, arr=[]) {
    return arr.find((el) => el[0]  === arrx && el[1] === arry);
  }
   isInArrIndex(arrx=0, arry=0, arr=[]) {
    return arr.findIndex((ele) => ele[0]  === arrx && ele[1] === arry);
  }

   renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;
    const color = true;

    const circlesBlue = this.isInArr(x,y,this.state.red)  ?
    <Circle color={color} /> :
    null;

    const circlesRed = this.isInArr(x,y,this.state.blue) ?
    <Circle color={!color} /> :
    null;


    return (

      <div key={i}
      style={{ width: '62px', height: '62px' }}
      onClick={() => this.handleSquareClick(x, y)}>
      <Square black={black}>
      {circlesRed}
      {circlesBlue}
      </Square>
      </div>
    );
  }


  canKick2(mult1, mult2, inverseColor, X, Y) {
    return (
      this.isInArr( X+(1*mult1) , Y+(1*mult2),this.state[inverseColor])
      && !(this.isInArr( X+(2*mult1) , Y+(2*mult2), this.state.blue)
      && !(this.isInArr( X+(2*mult1) , Y+(2*mult2), this.state.red)
      && X+(2*mult1)<8
      && Y+(2*mult2))<8
      && X+(2*mult1)>0
      && Y+(2*mult2))>0
    )
  };

  canKick(X,Y,color) {
    const inverseColor = color === 'red' ? 'blue' : 'red';
    const multiplArray = [[1,1],[-1,-1],[1,-1],[-1,1]];

    return (
      multiplArray.some((el) => this.canKick2(el[0], el[1], inverseColor, X, Y))
    )
  };


  canMakeStep2(mult1, mult2, X, Y) {
    return (
     !(this.isInArr( X+(mult1) , Y+(mult2), this.state.blue))
      && !(this.isInArr( X+(mult1) , Y+(mult2), this.state.red))
    )
  };
  canMakeStep(X,Y) {
    const multiplArray = [[1,1],[-1,-1],[1,-1],[-1,1]];

    return (
      multiplArray.some((el) => this.canMakeStep2(el[0], el[1], X, Y))
    )
  };


  // This method calculates can circle make step or kick other circle.
  canDoSomehting( X, Y, color) {
  return (
    this.canKick(X,Y,color) || this.canMakeStep(X,Y)
  )
}
newX (chX) {
  switch (chX) {
    case 0:
    return ('A');
    break;
    case 1:
    return ('B');
    break;
    case 2:
    return ('C');
    break;
    case 3:
    return ('D');
    break;
    case 4:
    return ('E');
    break;
    case 5:
    return ('F');
    break;
    case 6:
    return ('G');
    break;
    default:
    return ('H');
  }};


 handleSquareClick(X, Y) {

    let newState = this.state;
    const isRedInside = this.isInArr( X , Y, this.state.red);
    const redIndex = this.isInArrIndex( X, Y, this.state.red );
    const isBlueInside = this.isInArr( X , Y, this.state.blue);
    const blueIndex = this.isInArrIndex( X, Y, this.state.blue);
    const canDoSomehtingRed = this.canDoSomehting( X, Y, 'red');
    const canDoSomehtingBlue = this.canDoSomehting( X, Y, 'blue');
    const oneStep =  (Math.abs(newState.x0-X) === 1 && Math.abs(newState.y0-Y) === 1);
    const oneKick = (Math.abs(newState.x0-X) === 2 && Math.abs(newState.y0-Y) === 2);
    const isBlack =( (X + Y) % 2 === 1 );
    let isMadeKick = false;


    if (this.state.whoTurn === 'userred'){


      if (!this.state.select){
        console.log("is red " + isRedInside);
        console.log("can do "+ canDoSomehtingRed);
        if ((isRedInside) && (canDoSomehtingRed)) {
          newState.select = true;
          newState.index = redIndex;
          newState.x0 = X;
          newState.y0 = Y;
        }
      } else if( this.state.select && !(isMadeKick)) {
          if (isBlack && !(isBlueInside) && !(isRedInside)){

            console.log("is black " + isBlack);
            if (oneStep) {
              console.log("is one step " + oneStep);
              const arrRed = this.state.red;
              arrRed.splice(this.state.index, 1, [ X, Y]);
              newState.red = arrRed;

              const StepArrayRed = this.state.steparrayred;
              const elStepArrayRed = `${this.newX(newState.x0)}${newState.y0+1} =>${this.newX(X)}${Y+1};`;
              StepArrayRed.push(elStepArrayRed);
              newState.steparrayred = StepArrayRed;


              newState.select = false;
              newState.whoTurn = 'userblue';


            } if (oneKick) {
              console.log("is one kick " + oneKick);
              if (this.canKick(newState.x0, newState.y0,'red')) {
                console.log("is can cick 1" + this.canKick(newState.x0, newState.y0,'red'));


                const xDel = Math.abs(newState.x0+X)/2;
                const yDel = Math.abs(newState.y0+Y)/2;
                if (this.isInArr( xDel , yDel, this.state.blue)){
                  const delIndex = this.isInArrIndex( xDel, yDel, this.state.blue);

                  const arrBlue = this.state.blue;
                  arrBlue.splice(delIndex,1);
                  newState.blue = arrBlue;

                  const StepArrayRed = this.state.steparrayred;
                  const elStepArrayRed = `${this.newX(newState.x0)}${newState.y0+1} =>${this.newX(X)}${Y+1};`;
                  StepArrayRed.push(elStepArrayRed);
                  newState.steparrayred = StepArrayRed;

                  newState.x0 = X;
                  newState.y0 = Y;

                  const arrRed = this.state.red;
                  arrRed.splice(this.state.index, 1, [ X, Y]);
                  newState.red = arrRed;

                  if (this.canKick(newState.x0, newState.y0,'red')) {
                    isMadeKick = true;
                    console.log("isMadeKick " + isMadeKick);
                  } else {
                    newState.select = false;
                    newState.whoTurn = 'userblue';
                  }
                }
              }
            }
          }
        }





  } else {
    if (!this.state.select){
      console.log("is Blue " + isBlueInside);
      console.log("can do "+ canDoSomehtingBlue);
      if ((isBlueInside) && (canDoSomehtingBlue)) {
        newState.select = true;
        newState.index = blueIndex;
        newState.x0 = X;
        newState.y0 = Y;
      }
    } else if( this.state.select && !(isMadeKick)) {
        if (isBlack && !(isBlueInside) && !(isRedInside)){

          console.log("is black " + isBlack);
          if (oneStep) {
            console.log("is one step " + oneStep);
            const arrBlue = this.state.blue;
            arrBlue.splice(this.state.index, 1, [ X, Y]);
            newState.blue = arrBlue;

            const StepArrayBlue = this.state.steparrayblue;
            const elStepArrayBlue = `${this.newX(newState.x0)}${newState.y0+1} =>${this.newX(X)}${Y+1};`;
            StepArrayBlue.push(elStepArrayBlue);
            newState.steparrayblue = StepArrayBlue;


            newState.select = false;
            newState.whoTurn = 'userred';


          } if (oneKick) {
            console.log("is one kick " + oneKick);
            if (this.canKick(newState.x0, newState.y0,'blue')) {
              console.log("is can cick 1" + this.canKick(newState.x0, newState.y0,'blue'));


              const xDel = Math.abs(newState.x0+X)/2;
              const yDel = Math.abs(newState.y0+Y)/2;
              if (this.isInArr( xDel , yDel, this.state.red)){
                const delIndex = this.isInArrIndex( xDel, yDel, this.state.red);
                const arrRed = this.state.red;
                arrRed.splice(delIndex,1);
                newState.red = arrRed;


                const StepArrayBlue = this.state.steparrayblue;
                const elStepArrayBlue = `${this.newX(newState.x0)}${newState.y0+1} =>${this.newX(X)}${Y+1};`;
                StepArrayBlue.push(elStepArrayBlue);
                newState.steparrayblue = StepArrayBlue;


                newState.x0 = X;
                newState.y0 = Y;

                const arrBlue = this.state.blue;
                arrBlue.splice(this.state.index, 1, [ X, Y]);
                newState.blue = arrBlue;

                if (this.canKick(newState.x0, newState.y0,'blue')) {
                  isMadeKick = true;
                  console.log("isMadeKick " + isMadeKick);
                } else {
                  newState.select = false;
                  newState.whoTurn = 'userred';
                }
              }
            }
          }
        }
      }
    }

  this.setState(newState);
  }


render() {

  console.log('--------------------')
  console.log(this.state.blue.length);
  console.log(this.state.red.length);
  console.log('--------------------')


  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(this.renderSquare(i));
  }
  console.log(this.state);
  return (
    <div>
    <div style={{
      width: '496px',
      height: '496px',
      display: 'flex',
      flexWrap: 'wrap',
      border: '1px solid black',
      float: 'left'
    }}>
    {squares}

    </div>

    <div style={{
      width: '400px',
      float: 'left'}} >
      <h2> Ход:   {this.state.whoTurn}</h2>

      <div style={{
        width: '200px',
        float: 'left'}} >
        <h4> Красных шашек: {this.state.red.length}</h4>
        <div> Ходы красных:  {this.state.steparrayred.map(value => <li>{value}</li>)}</div>
        </div>
        <div style={{
          width: '200px',
          float: 'left'}} >
          <h4> Синих шашек: {this.state.blue.length}</h4>
          <div> Ходы синих:  {this.state.steparrayblue.map(value => <li>{value}</li>)}</div>
          </div>
          </div>
          </div>

  );
}
}
