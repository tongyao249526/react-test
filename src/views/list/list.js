import React, { Component } from 'react'
import Header from '../../component/header/header.js'
class test1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
        document.getElementById('header').innerHTML = '列表'
    }
    toDetail = () => {
        this.props.history.push({ pathname: '/detail' })
    }
    render() {
        return (
            <div>
                <div onClick={this.toDetail}>列表页面点击进入详情页面</div>
            </div>

        )
    }
}
export default test1