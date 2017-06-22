import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import LoadingComponent from './LoadingComponent';


class Result extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], selectedOptions: [], loading: true};
    this.calculateQuizResult = this.calculateQuizResult.bind(this);
    this.handleResultSave = this.handleResultSave.bind(this);
  }

  handleResultSave(quizResult) {
    console.log("---handleresultSave---");
    console.log(this.state);
    var solvedQuizID = this.state.selectedOptions._id;
    axios.put(`${this.props.urlSolved}/${solvedQuizID}`, {result: quizResult},
      {
        params: {
          putPurpose: 1, //Saving result
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  calculateQuizResult() {
    if(this.state.selectedOptions){
      var selections = this.state.selectedOptions.selections;
      var questions = this.state.data;

      if(selections){
        var correctAnswers = 0;
        selections.forEach(function(element) {
          function checkQuestionID(question) {
            return question._id == element.questionID;
          }
          if(questions.find(checkQuestionID)){
            if(questions.find(checkQuestionID).correct == element.selectedOption){
              correctAnswers++;
            }
          }
        });
        var result = (correctAnswers/this.props.quizSize*100).toFixed(2);
      }
    }
    return result;
  }

  componentDidMount() {
    //Get Questions List
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
      //Get Selections List of current User
      .then(res => {
        axios.get(this.props.urlSolvedByUser, {
          params: {
            userName: this.props.userName
          }
        })
        //Get the result
        .then(res => {
          this.setState({ selectedOptions: res.data, loading: false }, function() {
                          var quizResult = this.calculateQuizResult();
                          this.setState({ result: quizResult });
                          this.handleResultSave(quizResult);
          })
        })
      })
  }

    render() {

      const { loading } = this.state;

      if(loading) {
        return <LoadingComponent/>;
      }

      return (
        <div className='results-box'>
          <h1>Score: { this.state.result } %</h1>
        </div>
    )}
}

export default Result;
