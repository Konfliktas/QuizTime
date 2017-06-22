import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';


class QuizForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionTitle: this.props.questionTitle,
      optionA: this.props.optionA,
      optionB: this.props.optionB,
      optionC: this.props.optionC,
      optionD: this.props.optionD,
      correct: this.props.correct,
      uniqueID: this.props.uniqueID,
      selected: this.props.selected
    };
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

    handleOptionClick(e) {
        this.setState({ selected: e.currentTarget.id.slice(-4) });
        var currentState = this.state;
        this.props.onOptionClick(e, currentState);
    }

    render() {
      return (
          <div>
              <div className="question-label">
                <h3>
                  {this.state.questionTitle}
                </h3>
              </div>
              <div className={(this.state.selected == "optA" ?  'option-selected'  :  'option-not-selected') + ' option borderme'} id={ this.state.uniqueID + "optA"} onClick={ this.handleOptionClick }>
                    <a>
                      <span className={(this.state.selected == "optA" ?  'letter-selected'  :  'letter-not-selected') + ' letter'}><p>A</p></span>
                      <span className={(this.state.selected == "optA" ?  'option-text-selected'  :  'option-text-not-selected')}><p>{this.state.optionA}</p></span>
                    </a>
              </div>
              <div className={(this.state.selected == "optB" ? 'option-selected' : 'option-not-selected') + ' option borderme'}  id={ this.state.uniqueID + "optB"} onClick={ this.handleOptionClick }>
                <a>
                  <span className={(this.state.selected == "optB" ?  'letter-selected'  :  'letter-not-selected') + ' letter'}><p>B</p></span>
                  <span className={(this.state.selected == "optB" ?  'option-text-selected'  :  'option-text-not-selected')}><p>{this.state.optionB}</p></span>
                </a>
              </div>
              <div className={(this.state.selected == "optC" ? 'option-selected' : 'option-not-selected') + ' option borderme'}  id={ this.state.uniqueID + "optC"} onClick={ this.handleOptionClick }>
                <a>
                  <span className={(this.state.selected == "optC" ?  'letter-selected'  :  'letter-not-selected') + ' letter'}><p>C</p></span>
                  <span className={(this.state.selected == "optC" ?  'option-text-selected'  :  'option-text-not-selected')}><p>{this.state.optionC}</p></span>
                </a>
              </div>
              <div className={(this.state.selected == "optD" ? 'option-selected' : 'option-not-selected') + ' option borderme'}  id={ this.state.uniqueID + "optD"} onClick={ this.handleOptionClick }>
                <a>
                  <span className={(this.state.selected == "optD" ?  'letter-selected'  :  'letter-not-selected') + ' letter'}><p>D</p></span>
                  <span className={(this.state.selected == "optD" ?  'option-text-selected'  :  'option-text-not-selected')}><p>{this.state.optionD}</p></span>
                </a>
              </div>
          </div>
    )}
}

export default QuizForm;
