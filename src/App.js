import React from 'react';
import Wrapper from './components/Wrapper';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';
import Screen from './components/Screen';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      sign: '',
      num: 0,
      result: 0,
    };
  }

  math = (a,b, sign) => {
    return sign === '+' 
    ? a + b 
    : sign === '-'
    ? a - b
    : sign === 'X'
    ? a * b
    : a / b
}

  handleChange = (e) => {
    let screenNum = e.target.value;
    this.setState({
      num: screenNum,
    })
    console.log(e.target.value);
  }

  resetClickHandler = (e) => {
    this.setState({
      result: 0,
      num: 0,
      sign: '',
    });
    console.log('reset', this.state.result);
  }

  invertClickHandler = (e) => {
    this.setState({
      num: 
        this.state.num ? this.state.num * -1 : 0,
      result: 
        this.state.result ? this.state.result * -1 : 0,
      sign: '',
    })
    // this.state.num > 0 ? this.setState({num: this.state.num * 1})
    // : this.setState({num: this.state.num * -1}),
    console.log('invert', this.state.num, this.state.result);
  }

  percentClickHandler = (e) => {
    let num = this.state.num ? parseFloat(this.state.num) : 0;
    let result = this.state.result ? parseFloat(this.state.result) : 0;

    this.setState({
      num: (num /= Math.pow(100,1)),
      result: (result /= Math.pow(100,1)),
      sign: '',
    });
  }

  equalsClickHandler = (e) => {
    e.preventDefault();
    let value = e.target.innerHTML;
    if(this.state.sign && this.state.num) {
      this.setState({
        result: 
          this.state.num === 0 && this.state.sign === '/'
          ? 'NaN'
          : this.math(Number(this.state.result), Number(this.state.num), this.state.sign),
        sign: this.state.sign,
        num: 0,
      })
      console.log(this.state.result);
    }
  }
  
  signClickHandler = (e) => {
    // if an operator is pressed. sets sign state to selected operator
    // if no result, but num has state then result = num else result has state so it remains the same
    // results num state to 0 
    e.preventDefault();
    let value = e.target.innerHTML;
    this.setState({
      sign: value,
      result: 
        !this.state.result && this.state.num ? this.state.num : 
        this.math(Number(this.state.result), Number(this.state.num), this.state.sign),
      num: 0,
    })
  }

  commaClickHandler = (e) => {
    e.preventDefault();
    let value = e.target.innerHTML;
    // This event is to add a decimal point if user adds '.' and checks if num already includes '.'
    this.setState({
      num: !this.state.num.toString().includes('.') ? this.state.num + value : this.state.num,
    })
  }

  numClickHandler = (e) => {
    e.preventDefault();
    let value = e.target.innerHTML;
    // this event updates the num state and the result state 
    // num cannot start with a 0 if it is a whole number, num is being checked if it is a decimal 
    // num will display either 0 or update to a result of the value added
    this.setState({
      ...this.state.num,
      num: 
        this.state.num === 0 && value === '0'
          ? '0'
          : this.state.num % 1 === 0
          ? Number(this.state.num + value) // Number function changes string to num
          : this.state.num + value,
      result: !this.state.sign ? 0 : this.state.result,  
    });
  }

  render() {
    const btnValues = [
      ['C', '+-', '%', '/'],
      [7,8,9, 'X'],
      [4,5,6,'-'],
      [1,2,3, '+'],
      [0, '.', '='],
    ];
    console.log(this.state);
    return(
      <>
        <Wrapper>
          {/* this screen is being passed a prop to display the num user inputs or the result */}
          <Screen value={this.state.num ? this.state.num : this.state.result}/>
          <ButtonBox>
            {
              btnValues.flat().map((btn, i) => {
                return (
                  <Button
                    key={i}
                    className={btn === '=' ? 'equals' : ''}
                    value={btn}
                    onChange={this.handleChange}
                    onClick={
                      btn === 'C'
                        ? this.resetClickHandler
                        : btn === '+-'
                        ? this.invertClickHandler
                        : btn === '%'
                        ? this.percentClickHandler
                        : btn === '='
                        ? this.equalsClickHandler
                        : btn === '/' || btn === 'X' || btn === '+' || btn === '-'
                        ? this.signClickHandler
                        : btn === '.'
                        ? this.commaClickHandler
                        : this.numClickHandler
                    }
                  />
                )
              })
            }
          </ButtonBox>
        </Wrapper>
      </>
    )
  }
}

export default App;
