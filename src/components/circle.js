import React, { Component, PropTypes } from 'react';

export default class Circle extends Component {
  constructor() {
    super(...arguments)
    this.state = { isSelected: false }
  }

  onClick() {
    this.setState({ isSelected: !this.state.isSelected })
  }

  render() {
    const { color } = this.props;
    const colorName = color ? 'circle-red' : 'circle-blue';
    const selectedClass = this.state.isSelected ? 'selected' : '';

    return <span className={`${colorName} ${selectedClass}`}
                 onClick={this.onClick.bind(this)}>

    </span>;

  }
}

Circle.propTypes = {
 color: PropTypes.bool
};
