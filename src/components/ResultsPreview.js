import React, { Component } from 'react';
import axios from 'axios';
import LoadingComponent from './LoadingComponent';
import { sectionOfQuestionsSize } from '../../config';
import AdminMenuBar from './AdminMenuBar';

class ResultsPreview extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], questionNr: 0, active: 1, loading: true };
    this.loadQuestionsFromServer = this.loadQuestionsFromServer.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  loadQuestionsFromServer() {
    axios.get(this.props.urlSolved)
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
  }

  componentWillMount(){
    this.loadQuestionsFromServer();
  }

  navigate(e) {
    var selection = parseInt(e.target.innerText);

    var newQuestionNr = sectionOfQuestionsSize * (selection-1);
    this.setState({ questionNr: newQuestionNr, active: selection });
  }


  render() {
    const { loading } = this.state;

    if(loading) {
      return <LoadingComponent />;
    }

    let resultNodes = this.state.data.map(result => {
      let completionTime = ((result.dateFinished - result.dateStarted)/1000).toFixed(0);
      return (
        <div className="question" key={ result._id }>
          <h3>UserName: { result.userName }</h3>
          <h4>Completed in: { completionTime } seconds</h4>
          <h4>Result: { result.result } %</h4>
        </div>
      )
    })

    return (
      <div>
        <AdminMenuBar nodes={ resultNodes } data={ this.state.data } active={ this.state.active } questionNr= { this.state.questionNr } navigate={ this.navigate }/>
      </div>
    )
  }
}

export default ResultsPreview;
