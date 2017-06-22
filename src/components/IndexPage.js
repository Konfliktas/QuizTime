import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class IndexPage extends Component {
  render() {
    return (
      <div className="index-page-menu">
          <Link to={`/admin`}>
                <button className='btn btn-blue btn-home-menu'>Admin</button>
          </Link>
          <Link to={`/quiz`}>
                <button className='btn btn-blue btn-home-menu'>Questions</button>
          </Link>
      </div>
    )
  }
}

export default IndexPage;
