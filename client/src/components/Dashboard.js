import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import SearchBar from './search-bar';
import NoteList from './note-list';


const Dashboard = ({ secretData }) => (
  <div>
    <Card className="container">
      <CardTitle
        title="Dashboard"
        subtitle="You should get access to this page only after authentication."
      />

      {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
      <SearchBar />
    </Card>
    <NoteList />
  </div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;