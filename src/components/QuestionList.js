import React, { Component } from 'react';
import Question from './Question';
import AdminMenuBar from './AdminMenuBar';
import { sectionOfQuestionsSize } from './config';

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = { questionNr: 0, active: 1 };
    this.navigate = this.navigate.bind(this);
  }

  navigate(e) {
    var selection = parseInt(e.target.innerText);

    var newQuestionNr = sectionOfQuestionsSize * (selection-1);
    this.setState({ questionNr: newQuestionNr, active: selection });
  }

  render() {
    let questionNodes = this.props.data.map(question => {
      return (
        <Question
          questionTitle={ question.questionTitle }
          optionA={ question.optionA }
          optionB={ question.optionB }
          optionC={ question.optionC }
          optionD={ question.optionD }
          correct={ question.correct }
          uniqueID={ question['_id'] }
          onQuestionDelete={ this.props.onQuestionDelete }
          onQuestionUpdate={ this.props.onQuestionUpdate }
          key={ question['_id'] }>
        </Question>

      )
    })

    return (
      <div>
        <AdminMenuBar nodes={ questionNodes } data={ this.props.data } active={ this.state.active } questionNr= { this.state.questionNr } navigate={ this.navigate }/>
      </div>
    )
  }
}

export default QuestionList;
