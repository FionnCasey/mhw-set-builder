import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';

import { loadEquipment } from './store/db.js';
import MainNav from './components/MainNav.js';
import Collection from './pages/Collection.js';


class App extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                id: '',
                name: '',
                sets: [],
                loggedIn: false
            },
            dbLoaded: false
        };
    }

    componentWillMount() {
        if (!this.state.dbLoaded) loadEquipment(() => this.setState({ dbLoaded: true }));
    }

    userLogin = user => {
        this.setState({ user });
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <MainNav user={this.state.user} />
                    <Grid>
                        <Route path="/collection" component={() =>
                            <Collection user={this.state.user} />
                        }/>
                    </Grid>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
