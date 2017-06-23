import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { questionsUrl, adminName, solvedQuizesUrl } from '../../config';
import QuestionBox from './QuestionBox';

class AdminEntry extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: '', showValidationError: false, showAdmin: false };
    this.handleStartQuiz = this.handleStartQuiz.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
  }
  handleStartQuiz(e){
    e.preventDefault();

    var userName = this.state.userName;
    if (userName != adminName){
      this.setState({ showValidationError: true });
    } else {
      this.setState({ showAdmin: true, showValidationError: false });
    }
  }

  handleUserNameChange(e){
    this.setState({ userName: e.target.value });
  }

    render() {

      if(this.state.showAdmin) {
        return <QuestionBox url={ questionsUrl } urlSolved={ solvedQuizesUrl }/>
      }

      return (
        <div className="home">
            <form className='quiz-entry-form' onSubmit={ this.handleStartQuiz }>
              <span className='input input--isao'>
                <input
                  id='input-38'
                  type='text'
                  name='userName'
                  className='input__field input__field--isao'
                  value={ this.state.userName }
                  onChange={ this.handleUserNameChange }/>
                <label className='input__label input__label--isao' htmlFor='input-38' data-content='User Name'>
                    <span className='input__label-content input__label-content--isao'>User Name</span>
                </label>
              </span>
              <input className='btn btn-blue btn-start-quiz' type='submit' value='Manage Quiz' />
              {(this.state.showValidationError) ? (<div className="quiz-error">You are not authorised as Admin of the QuizTime App!</div>) : null}
            </form>
        </div>
    )}
}

export default AdminEntry;
