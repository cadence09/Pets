import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import Home from './Components/Home';
import Dogs from './Components/Dogs';
import Cats from './Components/Cats';
import Profile from './Components/Profiles';
import CatProfile from './Components/CatProfiles';
export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path='/Dogs' component={Dogs} />
                    <Route path='/Cats' component={Cats}/>
                    <Route path='/Profile' component={Profile}/>
                    <Route path='/CatProfile' component={CatProfile}/>
                </Switch>
            </Router>
        )
    }
}