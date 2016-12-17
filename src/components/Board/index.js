import { renderLogger, renderSquares,renderAlert } from './render';
import { prepareBoard } from './logic'
import { handleSquareClick } from './actions'
import React, { Component, PropTypes } from 'react';

export default class Board extends Component {
  constructor(){
    super(...arguments);
  }

  componentWillMount() {
    this.setState(prepareBoard());
  }

  handleSquareClick(X, Y) {
    this.setState(handleSquareClick(X, Y, this.state));
  }

  render() {
    return (
      <div>  <h1>Шашки</h1>
        {renderSquares(this.state, this.handleSquareClick.bind(this))}
        {renderLogger(this.state)}
        {renderAlert(this.state)}
      </div>
    );
  }
}
