import React from "react";
import './Button.css';

class Button extends React.Component{
  render(){
    return(
      <button 
        className={this.props.className} 
        onClick={this.props.onClick}
        key={this.props.key}
        >
        {this.props.value}
      </button>
    )
  }
}

export default Button;