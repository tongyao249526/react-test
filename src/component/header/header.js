import React, { Component } from 'react'
import './header.css'
export default class header extends Component {
    constructor(props) {
        super(props)
        console.log('header',props)
        this.state = {
             
        }
        
    }
    goBack = ()=>{
        window.history.back()
    }
    render() {
        return (
            <div className="header fl cen">
                <i onClick={this.goBack} className="header_back"></i>
                <p id="header"></p>
            </div>
        )
    }
}
