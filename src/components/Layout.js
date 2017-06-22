import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Layout extends Component {
  render() {
    return (
      <div className="app-container">
        <header className="quiz-header">
          <Link to="/">
            <img className="header-logo" src="/img/Quiz-Time.png" alt="Quiz-Time logo" />
          </Link>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            <strong>Quizz App 2017</strong>
          </p>
        </footer>
      </div>
    )
  }
}

export default Layout;
