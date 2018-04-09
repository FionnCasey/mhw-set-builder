import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';

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
            skillDB: null
        };
    }

    componentDidMount() {
        this.getSkillInfo();
    }

    getSkillInfo() {
        if (!this.state.skillDB) {
            let skillDB = [];
            fetch('https://mhw-db.com/skills')
    		.then(res => {
    			if (res.ok) return res.json();
    			throw new Error('Request failed.');
    		})
    		.then(results => {
                results.forEach(x => {
                   skillDB.push({
                       id: x.ranks[0].skill,
                       name: x.name,
                       ranks: x.ranks
                   });
                });
                this.setState({ skillDB });
    		})
    		.catch(err => {
    			console.log(err);
    		});
        }
    }

    userLogin = user => {
        this.setState({ user });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <MainNav />
                    <Grid>
                        <Route path="/collection" component={() =>
                            <Collection user={this.state.user} skillDB={this.state.skillDB}/>
                        }/>
                    </Grid>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
