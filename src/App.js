import React from "react";
import {
    Route,
    Switch,
    Link,
    withRouter
} from "react-router-dom";

import User from './components/User';
import Todo from './components/Todo';


const App = withRouter(props => {
    return (
        <div className="demo">
            <div className="demo-nav">
                <Link to="/">Todos</Link>
                <Link to="/user">Users</Link>
            </div>
            <Switch>
                <Route exact path='/' component={Todo} />
                <Route exact path="/user" component={User} />
            </Switch>
        </div>
    );
});

export default App;