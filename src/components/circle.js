import React, { Component, PropTypes } from 'react';

export default class Circle extends Component {
  render() {
    const { color } = this.props;
    const colorName = color ? 'circle-red' : 'circle-blue';
    const selectedClass = this.props.isSelected ? 'selected' : '';

    return <span className={`${colorName} ${selectedClass}`}
                //  onClick={this.props.onClick(this)}
                >

    </span>;

  }
}

Circle.propTypes = {
  // onClick: PropTypes.func,
  isSelected: PropTypes.bool,
  color: PropTypes.bool
};
