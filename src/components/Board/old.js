// import React, { Component, PropTypes } from 'react';
// import Square from './square';
// import Circle from './circle';
// import { connect } from 'react-redux';
// import * as actions from '../actions';
//
//
//
// export default class Board extends Component {
//
//   constructor(){
//     super(...arguments);
//   }
//
//   componentWillMount() {
//     const red = [];
//     const blue = [];
//     const yellow = [];
//     for (let i = 0; i < 64; i++) {
//       const x = i % 8;
//       const y = Math.floor(i / 8);
//       ((x + y) % 2 === 1 && (y < 3) ) ? red.push([x, y]) : null;
//       ((x + y) % 2 === 1 && (y > 4) ) ? blue.push([x, y]) : null;
//     }
//
//
//     this.setState({red});
//     this.setState({blue});
//     this.setState({yellow});
//     this.setState({whoTurn:'userred'});
//     this.setState({select:false});
//     this.setState({steparrayred:[]});
//     this.setState({steparrayblue:[]});
//     this.setState({selectred:false});
//     // this.setState({
//     //   red,
//     //   dgs,
//     // })
//   }
//
//
//
//     isInArr(arrx=0, arry=0, arr=[]) {
//     return arr.find((el) => el[0]  === arrx && el[1] === arry);
//   }
//    isInArrIndex(arrx=0, arry=0, arr=[]) {
//     return arr.findIndex((ele) => ele[0]  === arrx && ele[1] === arry);
//   }
//
//   // onCircleClick() {
//   //
//   // if (!this.props.isSelected){
//   // return  onClick={()=> this.props.select(false)}}
//   // else { return  onClick={()=> this.props.select(true)}}
//   // }
//
//    renderSquare(i) {
//     const x = i % 8;
//     const y = Math.floor(i / 8);
//     const black = (x + y) % 2 === 1;
//     // const color = true;
//     const isSelected = this.isInArr(x,y,this.state.yellow)? true : false;
//
//
//     const circlesRed = this.isInArr(x,y,this.state.red)  ?
//     <Circle color isSelected={isSelected}
//     // onClick={this.onCircleClick.bind(this)}
//      /> :
//     null;
//
//     const circlesBlue = this.isInArr(x,y,this.state.blue) ?
//     <Circle color={false} isSelected={isSelected} /> :
//     null;
//
//
//     return (
//
//       <div key={i}
//       style={{ width: '62px', height: '62px' }}
//       onClick={() => this.handleSquareClick(x, y)}>
//       <Square black={black}>
//       {circlesRed}
//       {circlesBlue}
//       </Square>
//       </div>
//     );
//   }
//
//
//
// newX (chX) {
//   return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][chX];
// };
//
//
//  handleSquareClick(X, Y) {
//
//     let newState = { ...this.state };
//     const isRedInside = this.isInArr( X , Y, this.state.red);
//     const redIndex = this.isInArrIndex( X, Y, this.state.red );
//     const isBlueInside = this.isInArr( X , Y, this.state.blue);
//     const blueIndex = this.isInArrIndex( X, Y, this.state.blue);
//     const canDoSomehtingRed = this.canDoSomehting( X, Y, 'red');
//     const canDoSomehtingBlue = this.canDoSomehting( X, Y, 'blue');
//     const oneStep =  (Math.abs(newState.x0-X) === 1 && Math.abs(newState.y0-Y) === 1);
//     const oneKick = (Math.abs(newState.x0-X) === 2 && Math.abs(newState.y0-Y) === 2);
//     const isBlack =( (X + Y) % 2 === 1 );
//     let isMadeKick = false;
//
//
//     if (this.state.whoTurn === 'userred'){
//
//       if (!this.state.select){
//         if ((isRedInside) && (canDoSomehtingRed)) {
//           newState.select = true;
//
//           const arrYel = newState.yellow;
//           arrYel.push([ X, Y]);
//           newState.yellow = arrYel;
//
//           newState.index = redIndex;
//           newState.x0 = X;
//           newState.y0 = Y;
//         }
//       } else if( this.state.select && !(isMadeKick)) {
//           if (isBlack && !(isBlueInside) && !(isRedInside)){
//
//             console.log("is black " + isBlack);
//             if (oneStep) {
//               console.log("is one step " + oneStep);
//               const arrRed = newState.red;
//               arrRed.splice(this.state.index, 1, [ X, Y]);
//               newState.red = arrRed;
//
//               const StepArrayRed = newState.steparrayred;
//               const elStepArrayRed = `${this.newX(newState.x0)}${newState.y0+1} =>${this.newX(X)}${Y+1};`;
//               StepArrayRed.push(elStepArrayRed);
//               newState.steparrayred = StepArrayRed;
//
//
//               newState.select = false;
//
//               let arrYel = newState.yellow;
//               arrYel=[];
//               newState.yellow = arrYel;
//
//
//               newState.whoTurn = 'userblue';
//
//
//             }
//
//              if (oneKick) {
//               console.log("is one kick " + oneKick);
//
//
//               if (this.canKick(newState.x0, newState.y0,'red')) {
//                 console.log("is can cick 1" + this.canKick(newState.x0, newState.y0,'red'));
//
//
//                 const xDel = Math.abs(newState.x0+X)/2;
//                 const yDel = Math.abs(newState.y0+Y)/2;
//                 if (this.isInArr( xDel , yDel, this.state.blue)){
//                   const delIndex = this.isInArrIndex( xDel, yDel, this.state.blue);
//
//                   const arrBlue = newState.blue;
//                   arrBlue.splice(delIndex,1);
//                   newState.blue = arrBlue;
//
//                   const StepArrayRed = newState.steparrayred;
//                   const elStepArrayRed = `${this.newX(newState.x0)}${newState.y0+1} =>${this.newX(X)}${Y+1};`;
//                   StepArrayRed.push(elStepArrayRed);
//                   newState.steparrayred = StepArrayRed;
//
//                   newState.x0 = X;
//                   newState.y0 = Y;
//
//                   const arrRed = newState.red;
//                   arrRed.splice(this.state.index, 1, [ X, Y]);
//                   newState.red = arrRed;
//
//                   if (this.canKick(newState.x0, newState.y0,'red')) {
//                     isMadeKick = true;
//                     console.log("isMadeKick " + isMadeKick);
//                   }
//                    else {
//                     newState.select = false;
//
//                     let arrYel = newState.yellow;
//                     arrYel=[];
//                     newState.yellow = arrYel;
//
//
//                     newState.whoTurn = 'userblue';
//                   }
//                 }
//               }
//             }
//           }
//         }
//   } else {
//     if (!this.state.select){
//       if ((isBlueInside) && (canDoSomehtingBlue)) {
//         newState.select = true;
//           const arrYel = newState.yellow;
//           arrYel.push([ X, Y]);
//           newState.yellow = arrYel;
//         newState.index = blueIndex;
//         newState.x0 = X;
//         newState.y0 = Y;
//       }
//     } else if( this.state.select && !(isMadeKick)) {
//         if (isBlack && !(isBlueInside) && !(isRedInside)){
//
//           console.log("is black" + isBlack);
//           if (oneStep) {
//             console.log("is one step " + oneStep);
//             const arrBlue = newState.blue;
//             arrBlue.splice(this.state.index, 1, [ X, Y]);
//             newState.blue = arrBlue;
//
//             const StepArrayBlue = newState.steparrayblue;
//             const elStepArrayBlue = `${this.newX(newState.x0)}${newState.y0+1} =>${this.newX(X)}${Y+1};`;
//             StepArrayBlue.push(elStepArrayBlue);
//             newState.steparrayblue = StepArrayBlue;
//
//
//             newState.select = false;
//
//             let arrYel = newState.yellow;
//             arrYel=[];
//             newState.yellow = arrYel;
//
//             newState.whoTurn = 'userred';
//
//
//           } if (oneKick) {
//             console.log("is one kick " + oneKick);
//             if (this.canKick(newState.x0, newState.y0,'blue')) {
//               console.log("is can cick 1" + this.canKick(newState.x0, newState.y0,'blue'));
//
//
//               const xDel = Math.abs(newState.x0+X)/2;
//               const yDel = Math.abs(newState.y0+Y)/2;
//               if (this.isInArr( xDel , yDel, this.state.red)){
//                 const delIndex = this.isInArrIndex( xDel, yDel, this.state.red);
//                 const arrRed = newState.red;
//                 arrRed.splice(delIndex,1);
//                 newState.red = arrRed;
//
//
//                 const StepArrayBlue = newState.steparrayblue;
//                 const elStepArrayBlue = `${this.newX(newState.x0)}${newState.y0+1} =>${this.newX(X)}${Y+1};`;
//                 StepArrayBlue.push(elStepArrayBlue);
//                 newState.steparrayblue = StepArrayBlue;
//
//
//                 newState.x0 = X;
//                 newState.y0 = Y;
//
//                 const arrBlue = newState.blue;
//                 arrBlue.splice(this.state.index, 1, [ X, Y]);
//                 newState.blue = arrBlue;
//
//                 if (this.canKick(newState.x0, newState.y0,'blue')) {
//                   isMadeKick = true;
//                   console.log("isMadeKick " + isMadeKick);
//                 } else {
//                   newState.select = false;
//
//                   let arrYel = this.state.yellow;
//                   arrYel=[];
//                   newState.yellow = arrYel;
//
//                   newState.whoTurn = 'userred';
//                 }
//               }
//             }
//           }
//         }
//
//   this.setState(newState);
// }
//
// notifier() {
//   if (this.state.whoTurn === 'userred'){
//     if (!this.state.select){
//       if ((isRedInside) && (canDoSomehtingRed)) {
//
//       } else {
//         alert( "Выберите одну из красных шашек,которая может сделать ход" );
//       }
//
//     } else if( this.state.select && !(isMadeKick)) {
//         if (isBlack && !(isBlueInside) && !(isRedInside)){
//           console.log("is black " + isBlack);
//           if (oneStep) {
//             console.log("is one step " + oneStep);
//           }
//
//            if (oneKick) {
//             console.log("is one kick " + oneKick);
//
//
//             if (this.canKick(newState.x0, newState.y0,'red')) {
//               console.log("is can cick 1" + this.canKick(newState.x0, newState.y0,'red'));
//
//               if (this.isInArr( xDel , yDel, this.state.blue)){
//
//                 if (this.canKick(newState.x0, newState.y0,'red')) {
//                   console.log("isMadeKick " + isMadeKick);
//                 } else {
//                 }
//               }
//             }
//           }else if ((!oneStep) && (!oneKick)) {
//             alert( "Ваша шашка не может сделать этот ход. Шашка может ходить на 1 ход или бить шашку противника" )
//           }
//         } else if (!isBlack) {
//           alert( "Вы выбрали белую клетку. Так не по правилам, выберите черную" )
//         } else if (isBlueInside) {
//           alert( "Вы выбрали клетку, занятую синей шашкой. Вы же понимаете, что сюда нельзя перенести красную" )
//         } else if (isRedInside) {
//           alert( "Вы выбрали клетку, занятую своей красной шашкой. Неужели вы хотите поместить их в одну клетку? " )
//         }
//       }
// } else {
//   if (!this.state.select){
//     if ((isBlueInside) && (canDoSomehtingBlue)) {
//
//     } else {
//       alert( "Выберите одну из синих шашек, которая может сделать ход" );
//     }
//   } else if( this.state.select && !(isMadeKick)) {
//       if (isBlack && !(isBlueInside) && !(isRedInside)){
//
//         console.log("is black" + isBlack);
//         if (oneStep) {
//           console.log("is one step " + oneStep);
//
//
//         } if (oneKick) {
//           console.log("is one kick " + oneKick);
//           if (this.canKick(newState.x0, newState.y0,'blue')) {
//             console.log("is can cick 1" + this.canKick(newState.x0, newState.y0,'blue'));
//
//
//             if (this.isInArr( xDel , yDel, this.state.red)){
//
//               if (this.canKick(newState.x0, newState.y0,'blue')) {
//                 console.log("isMadeKick " + isMadeKick);
//               } else {
//
//               }
//             }
//           }
//         } else if ((!oneStep) && (!oneKick)) {
//           alert( "Ваша шашка не может сделать этот ход. Шашка может ходить на 1 ход или бить шашку противника" )
//         }
//       } else if (!isBlack) {
//         alert( "Вы выбрали белую клетку. Так не по правилам, выберите черную" )
//       } else if (isBlueInside) {
//         alert( "Вы выбрали клетку, занятую синей шашкой. Вы же понимаете, что сюда нельзя перенести красную" )
//       } else if (isRedInside) {
//         alert( "Вы выбрали клетку, занятую своей красной шашкой. Неужели вы хотите поместить их в одну клетку? " )
//       }
// }
//
// render() {
//
//   console.log('--------------------')
//   console.log(this.state.blue.length);
//   console.log(this.state.red.length);
//   console.log('--------------------')
//
//
//   const squares = [];
//   for (let i = 0; i < 64; i++) {
//     squares.push(this.renderSquare(i));
//   }
//   console.log(this.state);
//   return (
//     <div>
//     <div style={{
//       width: '496px',
//       height: '496px',
//       display: 'flex',
//       flexWrap: 'wrap',
//       border: '1px solid black',
//       float: 'left'
//     }}>
//     {squares}
//
//     </div>
//
//     <div style={{
//       width: '400px',
//       float: 'left'}} >
//       <h2> Ход:   {this.state.whoTurn}</h2>
//
//       <div style={{
//         width: '200px',
//         float: 'left'}} >
//         <h4> Красных шашек: {this.state.red.length}</h4>
//         <div> Ходы красных:  {this.state.steparrayred.map(value => <li>{value}</li>)}</div>
//
//         </div>
//         <div style={{
//           width: '200px',
//           float: 'left'}} >
//           <h4> Синих шашек: {this.state.blue.length}</h4>
//           <div> Ходы синих:  {this.state.steparrayblue.map(value => <li>{value}</li>)}</div>
//           </div>
//           </div>
//           </div>
//
//   );
// }
// }
