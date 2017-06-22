import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';


class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {date: this.props.quizTimer};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if(this.state.date <= 0){
      this.props.onTimerOut();
    } else {
      this.setState({
        date: this.state.date-1
      });
    }
  }

  render() {
    return (
      <div className="quiz-timer">
        <h1>The quiz will be finished in: {this.state.date} seconds!</h1>
      </div>
    );
  }
}


export default Timer;
