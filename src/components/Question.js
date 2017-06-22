import React, { Component } from 'react';
import axios from 'axios';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state= {
      toBeUpdated: false,
      questionTitle: this.props.questionTitle,
      optionA: this.props.optionA,
      optionB: this.props.optionB,
      optionC: this.props.optionC,
      optionD: this.props.optionD,
      correct: this.props.correct,
      _id: this.props._id
    };
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.loadQuestionsFromServer = this.loadQuestionsFromServer.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.handleQuestionTitleChange = this.handleQuestionTitleChange.bind(this);
    this.handleCorrectChange = this.handleCorrectChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
  }

  loadQuestionsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  updateQuestion(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handleQuestionUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    var correctAnswer = document.getElementById('correct').value
    let questionTitle = (this.state.questionTitle) ? this.state.questionTitle : null;
    let optionA = (this.state.optionA) ? this.state.optionA : null;
    let optionB = (this.state.optionB) ? this.state.optionB : null;
    let optionC = (this.state.optionC) ? this.state.optionC : null;
    let optionD = (this.state.optionD) ? this.state.optionD : null;
    let correct = (correctAnswer) ? correctAnswer : null;
    let question = { questionTitle: questionTitle, optionA: optionA, optionB: optionB, optionC: optionC, optionD: optionD, correct: correct};

    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
    }, this.props.onQuestionUpdate(id, question))

  }

  deleteQuestion(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onQuestionDelete(id);
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

  handleQuestionTitleChange(e) {
    this.setState({ questionTitle: e.target.value });
  }
  handleCorrectChange(e) {
    this.setState({ correct: e.target.value });
  }

  render() {
    console.log("In Question");
    return (
      <div className='question'>
        <h3>Question title: {this.props.questionTitle}</h3>
        <h4>Option A: {this.props.optionA}</h4>
        <h4>Option B: {this.props.optionB}</h4>
        <h4>Option C: {this.props.optionC}</h4>
        <h4>Option D: {this.props.optionD}</h4>
        <h4>Correct: {this.props.correct}</h4>
        <a className='updateLink' href='#' onClick={ this.updateQuestion }>update</a>
        <a className='deleteLink' href='#' onClick={ this.deleteQuestion }>delete</a>
        { (this.state.toBeUpdated)
          ? (<form className='update-form' onSubmit={ this.handleQuestionUpdate }>
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
                  value='Update' />
            </form>)
          : null}
      </div>
    )
  }
}

export default Question;
