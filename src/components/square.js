import React, { Component, PropTypes } from 'react';

export default class Square extends Component {


  render() {
     const { black } = this.props;
     const fill = black ? 'black' : 'white';
     const stroke = black ? 'white' : 'black';

     return (
       <div style={{
         backgroundColor: fill,
         color: stroke,
         width: '62px',
         height: '62px',
      //   padding: '3px'
       }}>
         {this.props.children}
       </div>
     );
   }
 }

 Square.propTypes = {
   black: PropTypes.bool
 };
