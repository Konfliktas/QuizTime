import React, { Component } from 'react';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = { questionTitle: '', optionA: '', optionB: '', optionC: '', optionD: '', correct: 'optA', _id: '' };
    this.handleQuestionTitleChange = this.handleQuestionTitleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleCorrectChange = this.handleCorrectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQuestionTitleChange(e) {
    this.setState({ questionTitle: e.target.value });
  }

  handleCorrectChange(e) {
    this.setState({ correct: e.target.value });
  }

  handleOptionChange(e) {
    if(e.target.id === 'optA'){
      this.setState({ optionA: e.target.value });
    } else if (e.target.id === 'optB'){
        this.setState({ optionB: e.target.value });
    } else if (e.target.id === 'optC'){
        this.setState({ optionC: e.target.value });
    } else if (e.target.id === 'optD'){
        this.setState({ optionD: e.target.value });
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    let questionTitle = this.state.questionTitle.trim();
    let optionA = this.state.optionA.trim();
    let optionB = this.state.optionB.trim();
    let optionC = this.state.optionC.trim();
    let optionD = this.state.optionD.trim();
    let correct = this.state.correct.trim();
    let _id = this.state._id.trim();
    if (!questionTitle || !optionA || !optionB || !optionC || !optionD || !correct) {
      return;
    }
    this.props.onQuestionSubmit({ questionTitle: questionTitle, optionA: optionA, optionB: optionB, optionC: optionC, optionD: optionD, correct: correct, _id: _id });
    this.setState({ questionTitle: '', optionA: '', optionB: '', optionC: '', optionD: '', correct: '', _id: _id });
  }

  render() {
    return (
      <form  className="quesion-form" onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Enter question title'
          className="questionFormQuestionTitle"
          value={ this.state.questionTitle }
          onChange={ this.handleQuestionTitleChange } />
          <div className="select">
            <span className="arr"></span>
            <select id='correct' onChange={ this.handleCorrectChange }>
              <option value='optA' default>A</option>
              <option value='optB'>B</option>
              <option value='optC'>C</option>
              <option value='optD'>D</option>
            </select>
          </div>
          <div>
          <input
            type='text'
            id='optA'
            placeholder='Enter option A'
            className="questionFormText"
            value={ this.state.optionA }
            onChange={ this.handleOptionChange } />
          <input
              type='text'
              id='optB'
              placeholder='Enter option B'
              className="questionFormText"
              value={ this.state.optionB }
              onChange={ this.handleOptionChange } />
          <input
              type='text'
              id='optC'
              placeholder='Enter option C'
              className="questionFormText"
              value={ this.state.optionC }
              onChange={ this.handleOptionChange } />
          <input
              type='text'
              id='optD'
              placeholder='Enter option D'
              className="questionFormText"
              value={ this.state.optionD }
              onChange={ this.handleOptionChange } />
            </div>
            <input
              type='submit'
              className="btn btn-blue btn-post-question"
              value='Add question'/>
      </form>
    )
  }
}

export default QuestionForm;
