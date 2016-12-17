import React, { Component, PropTypes } from 'react';

export default class Square extends Component {
  render() {
     const { black } = this.props;
     const fill = black  ? 'blackSquare' : 'whiteSquare';

     return (
       <div className={`${fill}`}>
           {this.props.children}
       </div>
   );
 }
}

 Square.propTypes = {
   black: PropTypes.bool
 };
