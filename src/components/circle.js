import React, { Component, PropTypes } from 'react';

export default class Circle extends Component {
  render() {
    const { color } = this.props;
    const colorName = color ? 'circle-red' : 'circle-blue';
    const selectedClass = this.props.isSelected ? 'selected' : '';

    return(
      <div className = "circle" >
      <span className={`${colorName} ${selectedClass}`}> </span>
      </div>
      )
    }
}
Circle.propTypes = {
  isSelected: PropTypes.bool,
  color: PropTypes.bool
};
