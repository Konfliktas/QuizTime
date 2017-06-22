import React, { Component } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';
import LoadingComponent from './LoadingComponent';
import Question from './Question';
import update from 'react-addons-update';
import ResultsPreview from './ResultsPreview';

class QuestionBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], showQuestionForm: false, loading: true, showResultsPreview: false };
    this.loadQuestionsFromServer = this.loadQuestionsFromServer.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.handleQuestionDelete = this.handleQuestionDelete.bind(this);
    this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
  }

  loadQuestionsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
  }

  handleQuestionSubmit(question) {
    this.setState({ showQuestionForm: false });

    let questions = this.state.data;

    axios.post(this.props.url, question)
    .then(function (response) {
        question._id = response.data.question._id;
        var newState = update(this.state, {
          data : {
            $push : [question]
          }
        });
        this.setState(newState);
      }.bind(this))

      .catch(err => {
        console.error(err);
        this.setState({ data: questions });
      });
  }

  handleQuestionDelete(id) {

    let oldItems = this.state.data;

    //filter out the deleted element
    let newItems = oldItems.filter(function(oldItem){
      return oldItem._id != id;
    });
    this.setState({ data: newItems });

    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Question deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleQuestionUpdate(id, question) {
    axios.put(`${this.props.url}/${id}`, question)

    .then(function (response) {
        this.loadQuestionsFromServer();
      }.bind(this))

      .catch(err => {
        console.log(err);
      })
  }


  handleMenuButtonClick(e) {
    if(e.target.id === 'show-question-form'){
      this.setState({ showQuestionForm: true });
    }
    if(e.target.id === 'manage-questions'){
      this.setState({ showResultsPreview: false });
    }
    if(e.target.id === 'show-results'){
      this.setState({ showResultsPreview: true });
    }
  }

  componentWillMount(){
    this.loadQuestionsFromServer();
  }

  render() {
      const { loading } = this.state;

      if(loading) {
        return <LoadingComponent/>;
      }

    return (
      <div className='questionBox'>
        {(this.state.showResultsPreview) && (<div>
                                              <div className="admin-menu">
                                                <span><button id="manage-questions" className="btn btn-blue admin-menu-btn" onClick={ this.handleMenuButtonClick }>Manage questions</button></span>
                                                <span><button id="show-results" className="btn btn-blue admin-menu-btn-active" onClick={ this.handleMenuButtonClick }>Show Results</button></span>
                                              </div>
                                              <ResultsPreview urlSolved={ this.props.urlSolved }/>
                                             </div>)}
        {(!this.state.showResultsPreview) && (<div>
                                                <div className="admin-menu">
                                                  <span><button id="manage-questions" className="btn btn-blue admin-menu-btn-active" onClick={ this.handleMenuButtonClick }>Manage questions</button></span>
                                                  <span><button id="show-results" className="btn btn-blue admin-menu-btn" onClick={ this.handleMenuButtonClick }>Show Results</button></span>
                                                </div>
                                                <QuestionList
                                                  onQuestionDelete={ this.handleQuestionDelete }
                                                  onQuestionUpdate={ this.handleQuestionUpdate }
                                                  data={ this.state.data }/>
                                                  {(this.state.showQuestionForm) ? (<QuestionForm onQuestionSubmit={ this.handleQuestionSubmit }/>)
                                                  : (<button id="show-question-form" onClick={ this.handleMenuButtonClick } className="btn btn-blue btn-add">Add question</button>)}
                                                </div>
                                          )}
        </div>
    )
  }
}

export default QuestionBox;
