import React, { Component } from 'react'
import './style.css'
import logo from '../../assets/404.png'
class Page404 extends Component {

    render() {
        return (
            <div className='container404'>
                <img src={logo} alt='404\nPAGE NOT FOUND' />
            </div>
        )
    }
}

export default Page404