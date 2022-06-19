import React from 'react';
import { Textfit } from 'react-textfit';
import "./Screen.css";

class Screen extends React.Component{
  render(){
    return(
      <Textfit className='screen' mode='single' max={70}>
        {this.props.value}
      </Textfit>
    )
    }
}

export default Screen;