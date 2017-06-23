import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './IndexPage';
import NotFoundPage from './NotFoundPage';
import QuizEntry from './QuizEntry';
import AdminEntry from './AdminEntry';
import { solvedByUserUrl } from '../../quizConfig';

const renderIndex = () => <IndexPage />;
const renderQuizEntry = () => <QuizEntry urlSolvedByUser={ solvedByUserUrl }/>;
const renderAdminEntry = () => <AdminEntry />;
const renderLoading = () => <LoadingComponent/>;

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" render={renderIndex} />
          <Route exact path="/quiz" render={renderQuizEntry} />
          <Route exact path="/admin" render={renderAdminEntry} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    )
  }
}

export default App;
