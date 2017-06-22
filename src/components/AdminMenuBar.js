import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { sectionOfQuestionsSize } from './config';

class AdminMenuBar extends Component {
  render() {

    let numberOfNavButtons = Math.ceil(this.props.data.length / sectionOfQuestionsSize);
    let navButtons = [];
    for(var i=1; i <= numberOfNavButtons; i++){
      if(this.props.active == i){
        navButtons.push(<button className='quiz-admin-navButton-active' onClick={ this.props.navigate } key={i}>{i}</button>)
      } else {
        navButtons.push(<button className='quiz-admin-navButton' onClick={ this.props.navigate } key={i}>{i}</button>)
      }
    }

    //------- Population of questions in section
    let sectionOfQuestions = [];
    for(var j=0; j < sectionOfQuestionsSize; j++){
      sectionOfQuestions.push(this.props.nodes[this.props.questionNr+j])
    }

    return (
      <div>
        {(navButtons.length > 0) ? (<div>
                                      <div className="quiz-admin-navBar">
                                        { navButtons }
                                      </div>
                                        { sectionOfQuestions }
                                    </div>)
          : (<div className="no-results-found">There are no results!</div>)}
      </div>
    )
  }
}

export default AdminMenuBar;
