import React, { Component } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import routes from '../router/router'
import Header from '../component/header/header.js'
export default class home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <HashRouter>
                <Header></Header>
                <Switch>
                    {routes.map((e, i) => <Route key={i} {...e} />)}
                </Switch>
            </HashRouter>
        )
    }
}
