import { renderLogger, renderSquares } from './render';
import { prepareBoard } from './logic'
import { handleSquareClick } from './actions'
import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../actions';

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
      <div>
        {renderSquares(this.state, this.handleSquareClick.bind(this))}
        {renderLogger(this.state)}
      </div>
    );
  }
}
