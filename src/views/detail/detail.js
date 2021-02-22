import React, { Component } from 'react'
class detail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        document.getElementById('header').innerHTML = '详情'
    }
    render() {
        return (
            <div>
                <div onClick={this.abc}>详情页面</div>
            </div>

        )
    }
}

export default detail