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
      <form  className="question-form" onSubmit={ this.handleSubmit }>
          <span className='input-question-title input input--isao'>
            <input
              id='question-title'
              type='text'
              className='input__field input__field--isao'
              value={ this.state.questionTitle }
              onChange={ this.handleQuestionTitleChange }/>
            <label className='input__label input__label--isao' htmlFor='question-title' data-content='Question title'>
                <span className='input__label-content input__label-content--isao'>Enter question title</span>
            </label>
          </span>
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
              <div>
              <span className='question-option input input--isao'>
                <input
                  id='optA'
                  type='text'
                  className='input__field input__field--isao'
                  value={ this.state.optionA }
                  onChange={ this.handleOptionChange }/>
                <label className='input__label input__label--isao' htmlFor='optA' data-content='Option A'>
                    <span className='input__label-content input__label-content--isao'>Enter Option A</span>
                </label>
              </span>
              </div>
              <div>
              <span className='question-option input input--isao'>
                <input
                  id='optB'
                  type='text'
                  className='input__field input__field--isao'
                  value={ this.state.optionB }
                  onChange={ this.handleOptionChange }/>
                <label className='input__label input__label--isao' htmlFor='optB' data-content='Option B'>
                    <span className='input__label-content input__label-content--isao'>Enter Option B</span>
                </label>
              </span>
              </div>
              <div>
              <span className='question-option input input--isao'>
                <input
                  id='optC'
                  type='text'
                  className='input__field input__field--isao'
                  value={ this.state.optionC }
                  onChange={ this.handleOptionChange }/>
                <label className='input__label input__label--isao' htmlFor='optC' data-content='Option C'>
                    <span className='input__label-content input__label-content--isao'>Enter Option C</span>
                </label>
              </span>
              </div>
              <div>
              <span className='question-option input input--isao'>
                <input
                  id='optD'
                  type='text'
                  className='input__field input__field--isao'
                  value={ this.state.optionD }
                  onChange={ this.handleOptionChange }/>
                <label className='input__label input__label--isao' htmlFor='optD' data-content='Option D'>
                    <span className='input__label-content input__label-content--isao'>Enter Option D</span>
                </label>
              </span>
              </div>
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
