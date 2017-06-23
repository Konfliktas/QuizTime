import React, { Component } from 'react';
import axios from 'axios';
import QuizForm from './QuizForm';
import Timer from './Timer';
import update from 'react-addons-update';
import Result from './Result';
import LoadingComponent from './LoadingComponent';
import { quizSize, quizUrl, solvedQuizesUrl, questionsUrl, solvedByUserUrl } from '../../config';
import Cookies from 'universal-cookie';
import { quizTimer } from './config';


class QuizHighLevel extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], selectedOptions: [], questionNr: 0, solvedQuizID: '', loading: true, showResults: false, quizTimer: quizTimer };
    this.loadQuestionsFromServer = this.loadQuestionsFromServer.bind(this);
    this.handleSubmitQuiz = this.handleSubmitQuiz.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.navigateNext = this.navigateNext.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.saveQuestionsSet = this.saveQuestionsSet.bind(this);
  }

  loadQuestionsFromServer() {
    var userName = this.props.userName;

    axios.get(this.props.urlSolvedByUser, {
      params: {
        userName: userName
      }
    })
    .then(res => {
      if(!res.data){
        axios.get(this.props.url)
          .then(res => {
            this.setState({ data: res.data, loading: false });
            this.saveQuestionsSet(res.data);
        })
      } else{
            let timeLeft = (  quizTimer - ( (Date.now())/1000 - res.data.dateStarted/1000 ) ).toFixed(0);
            if (timeLeft > 0){
              this.setState({ data: res.data.questionsSet, solvedQuizID: res.data._id, loading: false, quizTimer: timeLeft });
            } else {
              const cookies = new Cookies();
              cookies.remove('userName', { path: '/' });
              this.setState({ data: res.data.questionsSet, solvedQuizID: res.data._id, loading: false, showResults: true });
            }

      }
    })
    .catch(function (error) {
         console.log(error);
    });
}

  saveQuestionsSet(questionsSet){
    var dateNow = Date.now();
    axios.post(this.props.urlSolved, questionsSet, {
      params: {
        userName: this.props.userName,
        dateStarted: dateNow
      }
    })
      .then(
        function (response) {
            var id = response.data.solvedQuiz._id;
            this.setState({ solvedQuizID: id });

      }.bind(this))
      .catch(err => {
          console.error(err);
    });
  }

  handleSubmitQuiz(){
    //Add UserName to selections array
    var userLoginName = {
      userName: this.props.userName
    };
    var newState = update(this.state, {
      selectedOptions : {
        $push : [userLoginName]
      }
    });
    this.setState(newState);

    var solvedQuizID = this.state.solvedQuizID;
    var dateNow = Date.now();

    axios.put(`${this.props.urlSolved}/${solvedQuizID}`, newState.selectedOptions,
      {
        params: {
          putPurpose: 0, //Saving selected options
          dateFinished: dateNow
      }
    })
      .catch(err => {
        console.error(err);
        this.setState({ data: questions });
      });
    //Redirect to Results page
    this.setState({ showResults: true });
    const cookies = new Cookies();
    cookies.remove('userName', { path: '/' });
  }


  handleSelection(e, currentState) {
    //Checking if the Question had any option selected before. If so -> remove it
    var currentSelections = this.state.selectedOptions;
    for(var i=0; i < this.state.selectedOptions.length;i++){
      if(this.state.selectedOptions[i].questionID == e.currentTarget.id.slice(0,-4)){
        currentSelections.splice(i, 1);
        this.setState({selectedOptions: currentSelections });
      }
    }
    //Defining the selected item object
    var selection = {
      questionID: e.currentTarget.id.slice(0,-4),
      selectedOption: e.currentTarget.id.slice(-4)
    };

    //Updating the state to reflect on what option is selected under particular question
    var newState = update(this.state, {
      selectedOptions : {
        $push : [selection]
      }
    });
    this.setState(newState);
  }

  navigateNext(){
    var newQuestionNr = this.state.questionNr + 1;
    this.setState({ questionNr: newQuestionNr });
  }

  navigateBack(){
    var newQuestionNr = this.state.questionNr - 1;
    this.setState({ questionNr: newQuestionNr });
  }

  componentDidMount() {
      this.loadQuestionsFromServer();
  }

  render() {

    const { loading } = this.state;

    if(loading) {
      return <LoadingComponent/>;
    }

    if(this.state.showResults) {
      return <Result quizSize={ quizSize } userName={ this.props.userName } url={ questionsUrl } urlSolved={ solvedQuizesUrl } urlSolvedByUser={ solvedByUserUrl }/> ;
    }

    let questionNodes = this.state.data.map(question => {
      var selection = "";
      for(var i=0; i < this.state.selectedOptions.length;i++){
        if(question._id == this.state.selectedOptions[i].questionID){
          selection = this.state.selectedOptions[i].selectedOption;
        }
      }
      return (
        <QuizForm
          onOptionClick={ this.handleSelection}
          url='http://localhost:3000/api/questions'
          questionTitle={ question.questionTitle }
          optionA={ question.optionA }
          optionB={ question.optionB }
          optionC={ question.optionC }
          optionD={ question.optionD }
          correct={ question.correct }
          uniqueID={ question['_id'] }
          key={ question['_id'] }
          selected={ selection }>
        </QuizForm>
      )
    })

    return (
      <div className='quiz-questions-form'>
        <Timer quizTimer={ this.state.quizTimer } onTimerOut={ this.handleSubmitQuiz }/>
          <div>
            { questionNodes[this.state.questionNr] }
            { (this.state.questionNr >= 0 && this.state.questionNr < this.state.data.length-1) ?
              (<button className='btn btn-blue btn-next' type="button" onClick={ this.navigateNext }>Next</button>)
              : null}
            { (this.state.questionNr > 0 && this.state.questionNr <= this.state.data.length-1) ?
              (<button className='btn btn-blue btn-back' type="button" onClick={ this.navigateBack }>Back</button>)
              : null}
            {  (this.state.questionNr == this.state.data.length-1) ?
              (<input onClick={ this.handleSubmitQuiz } type='submit'className='btn btn-submit' name='userName' value='submit'/>)
              : null}
          </div>
      </div>
    )
  }
}

export default QuizHighLevel;
