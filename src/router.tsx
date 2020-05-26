import {HashRouter,Route,Switch} from 'react-router-dom';
import React from 'react';

import {Home} from './components/Home';
import {MainContainer} from './components/NotesContainer'



const Router = ()=>{
    return (
        <HashRouter >
            <Switch>

            <Route path='/' exact component={Home}/>
            <Route path='/notes' exact component={MainContainer}/>
            </Switch>
        </HashRouter>
    )
}

export default Router;

