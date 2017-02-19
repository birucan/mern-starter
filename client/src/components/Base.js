import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
const style = {
  margin: 5,
};


const Base = ({ children }) => (
  <div>
      <div className="top-bar">
        <div className="top-bar-left">
          <IndexLink to="/">React App</IndexLink>
        </div>

        {Auth.isUserAuthenticated() ? (
          <div className="top-bar-right">
            <Link to="/logout">Log out</Link>
          </div>
        ) : (
          <div className="top-bar-right">
            <Link to="/signup"><RaisedButton label="Sign Up" primary={true} style={style} /></Link>
            <Link to="/login"><RaisedButton label="Login"  style={style} /></Link>
          </div>
        )}

      </div>
    { /* child component will be rendered here */ }
    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;