import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  margin: 5,
  title: {
    cursor: 'pointer'
  }, 
  appbar: {
    marginBottom: 20
  }
};

function handleTouchTap() {

}

export default class Base extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsOpen: false
    };
    
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({settingsOpen: !this.state.settingsOpen});
  }

  handleClose() {
    this.setState({settingsOpen: false});
  }

  render() {
    return (
      <div>
        <AppBar
          style={styles.appbar}
          title={<span style={styles.title}>React Template</span>}
          onTitleTouchTap={handleTouchTap}
          iconElementLeft={<IconButton><NavigationMenu onTouchTap={this.handleToggle} /></IconButton>}
          iconElementRight=
            {Auth.isUserAuthenticated() ? (
            <div className="top-bar-right">
              <Link to="/logout"><FlatButton label="Log out" style={styles} /></Link>
            </div>
          ) : (
            <div className="top-bar-right">
              <Link to="/signup"><RaisedButton label="Sign Up" primary={true} style={styles} /></Link>
              <Link to="/login"><RaisedButton label="Login"  style={styles} /></Link>
              <a href="/auth/facebook">Login with Facebook</a>  
            </div>
          )
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.settingsOpen}
          onRequestChange={this.handleToggle}
        >
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
      
      { /* child component will be rendered here */ }
      {this.props.children}

    </div>
    );
  }
}


Base.propTypes = {
  children: PropTypes.object.isRequired
};

