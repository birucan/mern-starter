import React, { Component } from 'react';

import { Card, CardTitle, CardText, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Auth from '../modules/Auth';

export default class NoteList extends Component {
    constructor(props) {
        super(props);

        this.state = { notes: '' };

        this.renderNotes = this.renderNotes.bind(this);
        this.getNotes = this.getNotes.bind(this);
    }

    componentWillMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/notes');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // Set the authorization HTTP setRequestHeader
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log(xhr.response);
                this.setState({
                    notes: xhr.response
                });
            }
        });
        xhr.send();
    }

    getNotes() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/notes');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // Set the authorization HTTP setRequestHeader
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log(xhr.response);
                this.setState({
                    notes: xhr.response
                });
            }
        });
        xhr.send();
    }

    renderNotes() {
        if (this.state.notes.length == 0) {
            return <div>Loading notes...</div>;
        }
        
        if (this.state.notes) {
            return this.state.notes.map((note) => {
                return (
                    <Card className="container" key={note._id}>
                        <CardHeader
                            title={note.note}
                            />
                        <CardActions>
                            <FlatButton label="Edit" />
                            <FlatButton label="Delete" />
                        </CardActions>
                    </Card>
                );
            })
        }
    }

    render() {
        return (
            <div>
                {this.renderNotes()}
            </div>
        );
    }
}
