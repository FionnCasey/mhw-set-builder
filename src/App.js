import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';

import { loadEquipment } from './store/db.js';
import MainNav from './components/MainNav.js';
import Collection from './pages/Collection.js';
import Generate from './pages/Generate.js';


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
            dbLoaded: false,
            activeIndex: -1,
            results: []
        };
    }

    componentWillMount() {
        if (!this.state.dbLoaded) loadEquipment(() => this.setState({ dbLoaded: true }));
    }

    setResults = results => {
        this.setState({ results });
    }

    logout = () => {
        this.setState({
           user: {
               id: '',
               name: '',
               sets: [],
               loggedIn: false
           },
           activeIndex: -1
        });
    };

    login = user => {
        this.setState({ user });
    };

    addSet = set => {
        let { user } = this.state;
        user.sets.unshift(set);
        this.setState({ user, activeIndex: 0 });
    };

    setActiveIndex = i => {
        this.setState({ activeIndex: i });
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <MainNav user={this.state.user} login={this.login} logout={this.logout}/>
                    <Grid>
                        <Route path="/collection" component={() =>
                            <Collection
                                user={this.state.user}
                                addSet={this.addSet}
                                activeIndex={this.state.activeIndex}
                                setActiveIndex={this.setActiveIndex}
                            />
                        }/>
                        <Route path="/generate" component={() =>
                            <Generate user={this.state.user} />
                        }/>
                        <Route exact path="/" component={() =>
                            <Generate user={this.state.user} />
                        }/>
                    </Grid>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
