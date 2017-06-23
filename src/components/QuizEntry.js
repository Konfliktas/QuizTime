import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import QuizHighLevel from './QuizHighLevel';
import { quizSize, quizUrl, solvedQuizesUrl, questionsUrl, solvedByUserUrl } from '../../config';
import Cookies from 'universal-cookie';


class QuizEntry extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: '', showValidationError: false };
    this.handleStartQuiz = this.handleStartQuiz.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
  }

  handleStartQuiz(e){
    e.preventDefault();
    var userName = this.state.userName;

    axios.get(this.props.urlSolvedByUser, {
      params: {
        userName: userName
      }
    })
    .then(res => {
      if(res.data){
        this.setState({ showValidationError: true });
      } else {
        const cookies = new Cookies();
        cookies.set('userName', userName, { path: '/' });
        this.setState({ showQuiz: true, showValidationError: false });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleUserNameChange(e){
    this.setState({ userName: e.target.value });
  }

    render() {
      const cookies = new Cookies();
      const savedUserName = cookies.get('userName');

      if(this.state.showQuiz || savedUserName) {
        if(!savedUserName){
          savedUserName == this.state.userName;
        }
        return <QuizHighLevel userName={ savedUserName } url={ quizUrl } urlSolved={ solvedQuizesUrl } urlSolvedByUser={ solvedByUserUrl }/>;
      }

      return (
        <div className="home">
            <form className='quiz-entry-form' onSubmit={ this.handleStartQuiz }> {/*method='push' action='/quiz'>*/}
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
              <input className='btn btn-blue btn-start-quiz' type='submit' value='Start Quiz' />
              {(this.state.showValidationError) ? (<div className="quiz-error">This userName was already used to solve quiz!</div>) : null}
            </form>
        </div>
    )}
}

export default QuizEntry;
